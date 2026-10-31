import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class DLayouts {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function reRenderList,
    required Function event,
  }) {
    if (data['name'] != 'Layouts') {
      return const SizedBox.shrink();
    }

    final props = Map<String, dynamic>.from(data['props'] ?? {});

    event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

    return _LayoutsView(
      key: ValueKey(data['id']),
      layouts: List<dynamic>.from(props['layouts'] ?? []),
      reRender: reRender,
      fixed: props['fixed'] == true,
    );
  }
}

class _LayoutsView extends StatefulWidget {
  final List<dynamic> layouts;
  final Function reRender;
  final bool fixed;

  const _LayoutsView({
    super.key,
    required this.layouts,
    required this.reRender,
    required this.fixed,
  });

  @override
  State<_LayoutsView> createState() => _LayoutsViewState();
}

class _LayoutsViewState extends State<_LayoutsView> {
  static const double _mobileBreakpoint = 640;
  static const double _gap = 12;
  static const double _minimumWidth = 100;

  late List<dynamic> _layouts;

  // A positive value is a preferred width in logical pixels.
  // Zero means the layout should use flexible space.
  late List<double> _preferredWidths;

  late PageController _pageController;

  int _focusedIndex = 0;
  bool _resizing = false;

  @override
  void initState() {
    super.initState();

    _layouts = List<dynamic>.from(widget.layouts);
    _preferredWidths = _layouts.map<double>((layout) {
      return _configuredWidth(layout);
    }).toList();

    _pageController = PageController(viewportFraction: 0.94);
  }

  double _configuredWidth(dynamic layout) {
    final props = layout is Map ? layout['props'] : null;

    final width =
        double.tryParse(
          props is Map ? props['width']?.toString() ?? '0' : '0',
        ) ??
        0;

    return width > 0 ? width : 0;
  }

  @override
  void didUpdateWidget(covariant _LayoutsView oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (oldWidget.layouts != widget.layouts) {
      final oldWidths = List<double>.from(_preferredWidths);

      _layouts = List<dynamic>.from(widget.layouts);

      _preferredWidths = List.generate(_layouts.length, (index) {
        if (index < oldWidths.length) {
          return oldWidths[index];
        }

        return _configuredWidth(_layouts[index]);
      });

      if (_layouts.isEmpty) {
        _focusedIndex = 0;
      } else if (_focusedIndex >= _layouts.length) {
        _focusedIndex = _layouts.length - 1;
      }
    }
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  // Calculates the actual panel widths.
  //
  // fixed: true:
  //   Panels fit into the available width.
  //
  // fixed: false:
  //   Explicit widths are preserved; overflowing panels can scroll.
  //
  // width: 0:
  //   Flexible layout sharing remaining space.
  List<double> _calculateWidths(double availableWidth) {
    if (_layouts.isEmpty) return [];

    final totalGaps = _gap * (_layouts.length - 1);

    final usableWidth = (availableWidth - totalGaps)
        .clamp(0.0, double.infinity)
        .toDouble();

    final requestedWidths = List<double>.from(_preferredWidths);

    final flexibleIndexes = <int>[];
    double explicitTotal = 0;

    for (int i = 0; i < requestedWidths.length; i++) {
      if (requestedWidths[i] <= 0) {
        flexibleIndexes.add(i);
      } else {
        explicitTotal += requestedWidths[i];
      }
    }

    if (widget.fixed) {
      // When all explicit widths fit, preserve them and distribute
      // the remaining space equally between flexible layouts.
      if (explicitTotal <= usableWidth && flexibleIndexes.isNotEmpty) {
        final flexibleWidth =
            (usableWidth - explicitTotal) / flexibleIndexes.length;

        for (final index in flexibleIndexes) {
          requestedWidths[index] = flexibleWidth;
        }

        return requestedWidths;
      }

      // If everything fits without flexible panels, keep configured
      // widths exactly as requested.
      if (explicitTotal <= usableWidth && flexibleIndexes.isEmpty) {
        return requestedWidths;
      }

      // If configured widths exceed the available space, proportionally
      // fit all panels into the available width.
      final weights = requestedWidths.map<double>((value) {
        return value > 0 ? value : 1.0;
      }).toList();

      final totalWeight = weights.fold<double>(0, (sum, value) => sum + value);

      if (totalWeight <= 0) return requestedWidths;

      return weights
          .map((weight) => usableWidth * weight / totalWeight)
          .toList();
    }

    // Non-fixed mode: explicit widths remain fixed.
    // Flexible panels share the remaining space when possible.
    final widths = List<double>.from(requestedWidths);

    final flexibleWidth = flexibleIndexes.isEmpty
        ? 0.0
        : ((usableWidth - explicitTotal) / flexibleIndexes.length)
              .clamp(_minimumWidth, double.infinity)
              .toDouble();

    for (final index in flexibleIndexes) {
      widths[index] = flexibleWidth;
    }

    return widths;
  }

  void _resizePair(int index, double delta, double availableWidth) {
    if (index < 0 || index + 1 >= _layouts.length) return;

    final widths = _calculateWidths(availableWidth);

    if (index + 1 >= widths.length) return;

    final firstWidth = widths[index];
    final secondWidth = widths[index + 1];

    // Fixed layouts may become narrower than the normal minimum when
    // many panels must fit. Never allow a resize to produce a negative width.
    final minimum = widget.fixed ? 1.0 : _minimumWidth;

    final minDelta = minimum - firstWidth;
    final maxDelta = secondWidth - minimum;

    if (maxDelta < minDelta) return;

    final adjustedDelta = delta.clamp(minDelta, maxDelta).toDouble();

    if (adjustedDelta == 0) return;

    setState(() {
      // Store actual widths so configured widths and user resizing
      // use the same sizing system.
      _preferredWidths[index] = firstWidth + adjustedDelta;
      _preferredWidths[index + 1] = secondWidth - adjustedDelta;
    });
  }

  Widget _layoutCard(
    dynamic layout, {
    required bool focused,
    required double height,
  }) {
    final theme = Theme.of(context);

    return AnimatedContainer(
      duration: const Duration(milliseconds: 180),
      curve: Curves.easeOut,
      height: height,
      decoration: BoxDecoration(
        color: theme.colorScheme.background,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: theme.colorScheme.foreground.withValues(
            alpha: focused ? 0.32 : 0.14,
          ),
          width: focused ? 1.4 : 0.8,
        ),
        boxShadow: [
          BoxShadow(
            color: theme.colorScheme.foreground.withValues(
              alpha: focused ? 0.055 : 0.02,
            ),
            blurRadius: focused ? 16 : 6,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      clipBehavior: Clip.antiAlias,
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: widget.reRender(layout['props']['widget']),
      ),
    );
  }

  Widget _resizeHandle({
    required int index,
    required double availableWidth,
    required double height,
  }) {
    final theme = Theme.of(context);

    return SizedBox(
      width: _gap,
      height: height,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onHorizontalDragStart: (_) {
          setState(() => _resizing = true);
        },
        onHorizontalDragUpdate: (details) {
          _resizePair(index, details.delta.dx, availableWidth);
        },
        onHorizontalDragEnd: (_) {
          setState(() => _resizing = false);
        },
        onHorizontalDragCancel: () {
          setState(() => _resizing = false);
        },
        child: Center(
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 150),
            width: _resizing ? 5 : 3,
            height: _resizing ? 54 : 42,
            decoration: BoxDecoration(
              color: theme.colorScheme.primary.withValues(
                alpha: _resizing ? 0.9 : 0.6,
              ),
              borderRadius: BorderRadius.circular(10),
            ),
          ),
        ),
      ),
    );
  }

  Widget _mobileView(double width, double height) {
    if (_layouts.isEmpty) {
      return const SizedBox.shrink();
    }

    final cardHeight = height * 0.90;

    return SizedBox(
      width: double.infinity,
      height: height,
      child: PageView.builder(
        controller: _pageController,
        itemCount: _layouts.length,
        clipBehavior: Clip.none,
        physics: _resizing
            ? const NeverScrollableScrollPhysics()
            : const PageScrollPhysics(),
        onPageChanged: (index) {
          setState(() => _focusedIndex = index);
        },
        itemBuilder: (context, index) {
          final isFocused = index == _focusedIndex;

          final configuredWidth = _preferredWidths[index];

          final cardWidth = widget.fixed
              ? (configuredWidth > 0
                    ? configuredWidth.clamp(1.0, width * 0.90).toDouble()
                    : width * 0.90)
              : (configuredWidth > 0 ? configuredWidth : width * 0.90);

          return Center(
            child: SizedBox(
              width: cardWidth,
              height: cardHeight,
              child: Stack(
                clipBehavior: Clip.none,
                children: [
                  Positioned.fill(
                    child: _layoutCard(
                      _layouts[index],
                      focused: isFocused,
                      height: cardHeight,
                    ),
                  ),

                  // Dragging this handle resizes the focused layout
                  // against the next layout without changing order.
                  if (index < _layouts.length - 1)
                    Positioned(
                      right: -8,
                      top: 0,
                      bottom: 0,
                      width: 24,
                      child: GestureDetector(
                        behavior: HitTestBehavior.opaque,
                        onHorizontalDragStart: (_) {
                          setState(() {
                            _focusedIndex = index;
                            _resizing = true;
                          });
                        },
                        onHorizontalDragUpdate: (details) {
                          _resizePair(index, details.delta.dx, width);
                        },
                        onHorizontalDragEnd: (_) {
                          setState(() => _resizing = false);
                        },
                        onHorizontalDragCancel: () {
                          setState(() => _resizing = false);
                        },
                        child: Center(
                          child: Container(
                            width: 4,
                            height: 46,
                            decoration: BoxDecoration(
                              color: Theme.of(context).colorScheme.primary
                                  .withValues(alpha: 0.8),
                              borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _desktopView(double width, double height) {
    if (_layouts.isEmpty) {
      return const SizedBox.shrink();
    }

    final cardHeight = height * 0.90;

    // Account for the horizontal padding outside the panel row.
    const horizontalPadding = 12.0;
    final panelAvailableWidth = (width - horizontalPadding * 2)
        .clamp(1.0, double.infinity)
        .toDouble();

    final widths = _calculateWidths(panelAvailableWidth);

    final totalWidth =
        widths.fold<double>(0, (sum, panelWidth) => sum + panelWidth) +
        _gap * (_layouts.length - 1);

    return SizedBox(
      width: double.infinity,
      height: cardHeight,
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(
          horizontal: horizontalPadding,
          vertical: 4,
        ),
        child: SizedBox(
          width: totalWidth,
          height: cardHeight - 8,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              for (int index = 0; index < _layouts.length; index++) ...[
                SizedBox(
                  width: widths[index],
                  child: _layoutCard(
                    _layouts[index],
                    focused: index == _focusedIndex,
                    height: cardHeight - 8,
                  ),
                ),
                if (index < _layouts.length - 1)
                  _resizeHandle(
                    index: index,
                    availableWidth: panelAvailableWidth,
                    height: cardHeight - 8,
                  ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth.isFinite
            ? constraints.maxWidth
            : MediaQuery.of(context).size.width;

        final height = constraints.maxHeight.isFinite
            ? constraints.maxHeight
            : MediaQuery.of(context).size.height;

        if (width < _mobileBreakpoint) {
          return _mobileView(width, height);
        }

        return _desktopView(width, height);
      },
    );
  }
}
