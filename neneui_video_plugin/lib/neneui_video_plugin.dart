import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:video_player/video_player.dart';
import 'package:video_player_media_kit/video_player_media_kit.dart';

class NeneuiVideoPlugin {
  static void initPlugin() {
    VideoPlayerMediaKit.ensureInitialized(windows: true, linux: true);
  }

  static Map<String, dynamic> manifest() {
    return {
      'plugin': 'nene_video',
      'widgetResolver':
          (
            BuildContext context,
            Map<String, dynamic> data,
            Function reRender,
            Function event,
          ) {
            final props = data['props'] as Map<String, dynamic>;

            return NeneVideoWidget(
              url: props['url']?.toString() ?? '',
              width: (props['width'] as num?)?.toDouble(),
              height: (props['height'] as num?)?.toDouble(),
            );
          },
    };
  }
}

class NeneVideoWidget extends StatefulWidget {
  final String url;
  final double? width;
  final double? height;

  const NeneVideoWidget({
    super.key,
    required this.url,
    this.width,
    this.height,
  });

  @override
  State<NeneVideoWidget> createState() => _NeneVideoWidgetState();
}

class _NeneVideoWidgetState extends State<NeneVideoWidget> {
  late final VideoPlayerController _controller;
  late final Future<void> _initializeFuture;

  bool _showControls = true;

  @override
  void initState() {
    super.initState();

    _controller = VideoPlayerController.networkUrl(Uri.parse(widget.url));

    _initializeFuture = _controller.initialize();

    _controller.addListener(_videoListener);
  }

  void _videoListener() {
    if (mounted) {
      setState(() {});
    }
  }

  @override
  void dispose() {
    _controller.removeListener(_videoListener);
    _controller.dispose();
    super.dispose();
  }

  void _togglePlay() {
    if (_controller.value.isPlaying) {
      _controller.pause();
    } else {
      _controller.play();
    }
  }

  void _seek(Duration offset) {
    final position = _controller.value.position;
    final duration = _controller.value.duration;

    var target = position + offset;

    if (target < Duration.zero) {
      target = Duration.zero;
    }

    if (target > duration) {
      target = duration;
    }

    _controller.seekTo(target);
  }

  String _formatDuration(Duration duration) {
    final hours = duration.inHours;
    final minutes = duration.inMinutes.remainder(60);
    final seconds = duration.inSeconds.remainder(60);

    if (hours > 0) {
      return '$hours:${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
    }

    return '$minutes:${seconds.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: FutureBuilder<void>(
        future: _initializeFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState != ConnectionState.done) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(
              child: Text(
                'Failed to load video\n${snapshot.error}',
                textAlign: TextAlign.center,
              ),
            );
          }

          if (!_controller.value.isInitialized) {
            return const Center(child: Text('Video failed to initialize'));
          }

          final duration = _controller.value.duration;
          final position = _controller.value.position;

          final durationMs = duration.inMilliseconds;
          final positionMs = position.inMilliseconds.clamp(
            0,
            durationMs > 0 ? durationMs : 1,
          );

          final progress = durationMs > 0 ? positionMs / durationMs : 0.0;

          return GestureDetector(
            onTap: () {
              setState(() {
                _showControls = !_showControls;
              });
            },
            child: Stack(
              fit: StackFit.expand,
              children: [
                Center(
                  child: AspectRatio(
                    aspectRatio: _controller.value.aspectRatio,
                    child: VideoPlayer(_controller),
                  ),
                ),
                if (_showControls)
                  Positioned(
                    left: 0,
                    right: 0,
                    bottom: 0,
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [
                            const Color(0x00000000),
                            const Color(0xDD000000),
                          ],
                        ),
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Row(
                            children: [
                              Text(_formatDuration(position)),
                              Expanded(
                                child: Slider(
                                  value: SliderValue.single(progress),
                                  min: 0,
                                  max: 1,
                                  onChanged: (value) {
                                    final newProgress = value.value;

                                    _controller.seekTo(
                                      Duration(
                                        milliseconds: (newProgress * durationMs)
                                            .round(),
                                      ),
                                    );
                                  },
                                ),
                              ),
                              Text(_formatDuration(duration)),
                            ],
                          ),
                          Row(
                            children: [
                              Button(
                                style: const ButtonStyle.ghostIcon(),
                                onPressed: _togglePlay,
                                child: Icon(
                                  _controller.value.isPlaying
                                      ? LucideIcons.pause
                                      : LucideIcons.play,
                                ),
                              ),
                              Button(
                                style: const ButtonStyle.ghostIcon(),
                                onPressed: () {
                                  _seek(const Duration(seconds: -10));
                                },
                                child: const Icon(LucideIcons.skipBack),
                              ),
                              Button(
                                style: const ButtonStyle.ghostIcon(),
                                onPressed: () {
                                  _seek(const Duration(seconds: 10));
                                },
                                child: const Icon(LucideIcons.skipForward),
                              ),
                              const Spacer(),
                              if (_controller.value.isBuffering)
                                const Text('Buffering...'),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
              ],
            ),
          );
        },
      ),
    );
  }
}
