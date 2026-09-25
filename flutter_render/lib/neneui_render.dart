import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:quickjs_engine/quickjs_engine.dart';
import 'package:neneui_render/src/base/customMultipart.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Actions.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:neneui_render/src/parser/theme_parser.dart';
import 'package:neneui_render/src/render.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:file_picker/file_picker.dart';
import 'package:url_launcher/url_launcher.dart';

class InitUI {
  static Widget init({
    required String baseUrl,
    required String title,
    Map<String, dynamic> plugins = const {},
    bool debugShowCheckedModeBanner = true,
    ThemeData theme = const ThemeData(
      colorScheme: ColorSchemes.lightNeutral,
      surfaceOpacity: 0.8,
      surfaceBlur: 4.0,
    ),
    String defaultPage = "/ui/main",
  }) {
    return _NeneUIInitializer(
      baseUrl: baseUrl,
      title: title,
      plugins: plugins,
      debugShowCheckedModeBanner: debugShowCheckedModeBanner,
      fallbackTheme: const ThemeData(
        colorScheme: ColorSchemes.darkNeutral,
        scaling: 2,
        surfaceOpacity: 0.8,
        surfaceBlur: 4.0,
      ),
      defaultPage: defaultPage,
    );
  }
}

class _NeneUIInitializer extends StatefulWidget {
  final String baseUrl;
  final String title;
  final Map<String, dynamic> plugins;
  final bool debugShowCheckedModeBanner;
  final ThemeData fallbackTheme;
  final String defaultPage;

  const _NeneUIInitializer({
    required this.baseUrl,
    required this.title,
    required this.plugins,
    required this.debugShowCheckedModeBanner,
    required this.fallbackTheme,
    required this.defaultPage,
  });

  @override
  State<_NeneUIInitializer> createState() => _NeneUIInitializerState();
}

class _NeneUIInitializerState extends State<_NeneUIInitializer> {
  @override
  void initState() {
    super.initState();
    _themeFuture = _loadThemes();
  }

  late Future<(ThemeData, ThemeData, bool)> _themeFuture;

  Future<(ThemeData, ThemeData, bool)> _loadThemes() async {
    final response = await http.get(Uri.parse("${widget.baseUrl}/__neneui__"));

    final data = jsonDecode(response.body);
    final appTheme = data["appTheme"];

    final light = appTheme["light"];
    final dark = appTheme["dark"];

    final errorReporting = bool.tryParse(data['captureErrors'].toString());

    return (
      ThemeParser.parseTheme(light),
      ThemeParser.parseThemeDark(dark),
      errorReporting!,
    );
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<(ThemeData, ThemeData, bool)>(
      future: _themeFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return ShadcnApp(
            title: widget.title,
            theme: widget.fallbackTheme,
            debugShowCheckedModeBanner: widget.debugShowCheckedModeBanner,
            home: const Scaffold(
              child: Center(child: CircularProgressIndicator(strokeWidth: 38)),
            ),
          );
        }

        if (snapshot.hasError) {
          // print("NeneUI initialization error: ${snapshot.error}");
          // print(snapshot.stackTrace);

          return ShadcnApp(
            title: widget.title,
            theme: widget.fallbackTheme,
            debugShowCheckedModeBanner: widget.debugShowCheckedModeBanner,
            home: Scaffold(
              footers: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: SizedBox(
                    width: 200,
                    height: 100,
                    child: Center(
                      child: SecondaryButton(
                        leading: Icon(RadixIcons.reset),
                        child: Text("Try Again"),
                        onPressed: () {
                          // Navigator.of(context).pushReplacement(
                          //   ShadcnPageRoute(
                          //     builder: (context) => _NeneUIInitializer(
                          //       title: widget.title,
                          //       baseUrl: widget.baseUrl,
                          //       fallbackTheme: widget.fallbackTheme,
                          //       plugins: widget.plugins,
                          //       defaultPage: widget.defaultPage,
                          //       debugShowCheckedModeBanner:
                          //           widget.debugShowCheckedModeBanner,
                          //     ),
                          //   ),
                          // );
                          setState(() {
                            _themeFuture = _loadThemes();
                          });
                        },
                      ),
                    ),
                  ),
                ),
              ],
              child: Center(
                child: SizedBox(
                  width: 400,
                  height: MediaQuery.of(context).size.height - 410,
                  child: Card(
                    child: SingleChildScrollView(
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: .spaceEvenly,
                            children: [
                              Icon(RadixIcons.crossCircled, size: 28),
                              Text(
                                "Something Went Wrong",
                                style: TextStyle(fontSize: 28),
                              ),
                            ],
                          ),
                          const SizedBox(height: 10),
                          const Divider(),
                          const SizedBox(height: 10),
                          Text(
                            "Failed to initialize NeneUI:\n\n${snapshot.error}",
                            textAlign: TextAlign.center,
                          ),
                          Text("Plugin Data: ${widget.plugins.toString()}"),
                          TextButton(
                            child: Text("Copy Stacktrace"),
                            onPressed: () {
                              Clipboard.setData(
                                ClipboardData(
                                  text: snapshot.stackTrace.toString(),
                                ),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          );
        }

        final (lightTheme, darkTheme, captureErrors) = snapshot.data!;

        return ShadcnApp(
          title: widget.title,
          theme: lightTheme,
          darkTheme: darkTheme,
          debugShowCheckedModeBanner: widget.debugShowCheckedModeBanner,
          home: DrawerOverlay(
            child: NeneUIMain(
              plugins: widget.plugins,
              path: "${widget.baseUrl}${widget.defaultPage}",
              baseUrl: widget.baseUrl,
              captureErrors: captureErrors,
              showScaffold: true,
            ),
          ),
        );
      },
    );
  }
}

class NeneUIMain extends StatefulWidget {
  final String path;
  final String baseUrl;
  final bool captureErrors;
  final Map<String, dynamic> plugins;
  final bool showScaffold;

  const NeneUIMain({
    super.key,
    required this.baseUrl,
    required this.plugins,
    required this.path,
    required this.showScaffold,
    required this.captureErrors,
  });

  @override
  State<NeneUIMain> createState() => _NeneUIState();
}

class _NeneUIState extends State<NeneUIMain> {
  bool isUIProcessing = true;
  bool erroredOut = false;

  String errorText = "";

  Map<String, dynamic> ui = {};
  Map<String, dynamic> idDatabase = {"variables": <String, dynamic>{}};
  List<String> eventsFired = [];

  @override
  void initState() {
    super.initState();

    fetchUIRender();
  }

  void fetchUIRender() async {
    setState(() {
      erroredOut = false;
      isUIProcessing = true;
    });

    initJs();

    try {
      var reqs = await http.get(
        Uri.parse(widget.path),
        headers: {
          "User-Agent": "NeneUI/1.0",
          //   "DeviceWidthHeight":
          //       "${MediaQuery.of(context).size.width.toString()}x${MediaQuery.of(context).size.height.toString()}",
        },
      );

      if (reqs.statusCode == 200) {
        var jsonDecod = jsonDecode(reqs.body);

        setState(() {
          ui = jsonDecod;
          isUIProcessing = false;
        });
      } else {
        setState(() {
          erroredOut = true;
          errorText = reqs.reasonPhrase!;
        });
      }
    } catch (error) {
      setState(() {
        erroredOut = true;
        errorText = error.toString();
      });
    }
  }

  bool ioteDone = false;
  final runtime = getJavascriptRuntime(xhr: true);

  void eventExec(dynamic event, dynamic data) async {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      setState(() {
        eventsFired.add(event);
      });
    });
    if (event == Events.REGISTER_ID) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        setState(() {
          idDatabase.addAll({
            '${data['id']}': {
              'visible': true,
              'override': false,
              'props': data['props'],
            },
          });
        });
      });
    }

    if (event == Events.SELECT_FILE) {
      final PlatformFile? file = await FilePicker.pickFile(
        dialogTitle: data['title'],
        type: FileType.custom,
        allowedExtensions: data['types'].toString().split(","),
      );

      if (file == null) return;

      const maxMemoryFileSize = 10 * 1024 * 1024;

      final fileSize = file.lengthSync() ?? await file.length();

      Uint8List? bytes;

      if (fileSize! <= maxMemoryFileSize &&
          [
            "png",
            "jpeg",
            "jpg",
            "gif",
            "webp",
            "svg",
          ].contains(file.extension?.toLowerCase())) {
        bytes = await file.readAsBytes();
      }

      setState(() {
        idDatabase['variables'][data['variable']] = ".file,.name,.size";

        idDatabase['variables'][data['variable'] + ".file"] =
            bytes ?? "file:${file.path}";

        idDatabase['variables'][data['variable'] + ".name"] = file.name;

        idDatabase['variables'][data['variable'] + ".size"] = fileSize;
      });
    }

    if (event == Events.INVOKE_ONE_TIME_EXECUTION) {
      if (ioteDone) return;
      setState(() {
        ioteDone = true;
      });
      WidgetsBinding.instance.addPostFrameCallback((_) {
        for (var action in List.from(data)) {
          ActionsPerf.perform(
            context,
            eventExec,
            action['action'],
            action['data'],
          );
        }
      });
    }

    if (event == Events.INVOKE_NAVIGATE) {
      Navigator.of(context).push(
        ShadcnPageRoute(
          builder: (ctx) => NeneUIMain(
            path: "${widget.baseUrl}$data",
            baseUrl: widget.baseUrl,
            captureErrors: widget.captureErrors,
            showScaffold: true,
            plugins: widget.plugins,
          ),
        ),
      );
    }

    if (event == Events.INVOKE_NAVIGATE_REPLACE) {
      Navigator.of(context).pushReplacement(
        ShadcnPageRoute(
          builder: (ctx) => NeneUIMain(
            path: "${widget.baseUrl}$data",
            baseUrl: widget.baseUrl,
            captureErrors: widget.captureErrors,
            plugins: widget.plugins,
            showScaffold: true,
          ),
        ),
      );
    }

    if (event == Events.LAUNCH_URL) {
      String url = data['url'];

      if ((await canLaunchUrl(Uri.parse(url)))) {
        launchUrl(Uri.parse(url));
      } else {
        eventExec(data['noLaunch']['event'], data['noLaunch']['data']);
      }
    }

    if (event == Events.INVOKE_JS) {
      var jData = runtime.evaluate(data.toString());
      // ignore: avoid_print
      print("INVOKE_JS CALLED!");
      // ignore: avoid_print
      print(jData);
    }

    if (event == Events.INVOKE_POP) {
      if (Navigator.canPop(context)) {
        Navigator.of(context).pop();
      }
    }

    if (event == Events.PAY) {
      if (widget.plugins.containsKey("pay")) {
        final plugin = widget.plugins["pay"];

        if (plugin != null) {
          if (plugin['plugin'] == "nene_payments") {
            if (plugin['actionResolver'] is! Function) {
              print("ACTION RESOLVER IS NOT A FUNCTION!");
              print(plugin['actionResolver'].runtimeType);
              return;
            }
            print("NENE UI CALLED");
            print(data);
            print(plugin);
            plugin['actionResolver'](context, data, (callback) {
              if (callback == null) {
                eventExec(event, "Something Went Wrong with Payments System");
                return;
              } else {
                ActionsPerf.perform(
                  context,
                  eventExec,
                  callback['action'],
                  callback['data'],
                );
              }
            });
          }
        }
      } else {
        eventExec(
          Events.INVOKE_TOAST,
          "You do not have @neneys/payments initialized",
        );
      }
    }

    if (event == Events.INVOKE_TOAST) {
      showToast(
        context: context,
        builder: (context, overlay) {
          return SurfaceCard(
            child: Basic(
              title: Text(data),
              trailing: PrimaryButton(
                size: ButtonSize.small,
                onPressed: () {
                  // Close the toast programmatically when clicking Undo.
                  overlay.close();
                },
                child: const Icon(RadixIcons.cross1),
              ),
              trailingAlignment: Alignment.center,
            ),
          );
        },
        location: .bottomCenter,
      );
    }

    if (event == Events.HIDE_IDB) {
      if (idDatabase.containsKey(data)) {
        if (!data.toString().contains("#")) return;
        setState(() {
          idDatabase[data]['visible'] = false;
        });
      }
    }

    if (event == Events.SHOW_IDB) {
      if (idDatabase.containsKey(data)) {
        if (!data.toString().contains("#")) return;
        setState(() {
          idDatabase[data]['visible'] = true;
        });
      }
    }

    if (event == Events.DAIKON_DEBUG) {
      openDebugSlide();
    }

    if (event == Events.DIALOG) {
      showOverlay(
        context,
        DialogConfiguration(
          barrierDismissible: (data as Map).containsKey("props")
              ? bool.parse(data['props']['barrierDismissible'].toString())
              : true,
        ),
        builder: (context) => Daikon.Nene(
          context: context,
          idMap: idDatabase,
          ui: data,
          plugins: widget.plugins,
          path: widget.path,
          baseUrl: widget.baseUrl,
          captureErrors: widget.captureErrors,
          event: eventExec,
          setState: setState,
        ),
      );
    }

    if (event == Events.INVOKE_REPLACE_PROPS) {
      if (idDatabase.containsKey(data['id'])) {
        setState(() {
          idDatabase[data['id']]['override'] = true;
          idDatabase[data['id']]['props'] = data['props'];
        });
      }
    }

    if (event == Events.SUBMIT) {
      try {
        Map<String, dynamic> buildRequest = {};
        List<String> variables = List.from(data['variables']);
        List<String> varNames = List.from(data['varNames']);

        List<String> fileVariables = List.from(data['fileVariable']);
        List<String> fileNames = List.from(data['fileNames']);

        if (fileVariables.isNotEmpty) {
          final progress = ValueNotifier<double>(0);

          showOverlay(
            context,
            DialogConfiguration(),
            builder: (context) {
              return ValueListenableBuilder<double>(
                valueListenable: progress,
                builder: (_, value, _) {
                  return AlertDialog(
                    content: SizedBox(
                      width: 50,
                      height: 50,
                      child: Column(
                        children: [
                          CircularProgressIndicator(value: value),
                          Text("${(value * 100).toStringAsFixed(1)}%"),
                        ],
                      ),
                    ),
                  );
                },
              );
            },
          );

          final request = ProgressMultipartRequest(
            "POST",
            Uri.parse(widget.baseUrl + data['callbackPath']),
            onProgress: (sent, total) {
              progress.value = sent / total;
            },
          );

          for (var vb in variables) {
            request.fields[varNames[variables.indexOf(vb)]] =
                CoreParser.parseKVariable(idDatabase['variables'][vb])
                    .toString();
          }

          for (var i = 0; i < fileVariables.length; i++) {
            final vb = fileVariables[i];
            final file = idDatabase['variables']["$vb.file"];

            if (file is Uint8List) {
              request.files.add(
                http.MultipartFile.fromBytes(
                  fileNames[i],
                  file,
                  filename: idDatabase['variables']["$vb.name"],
                ),
              );
            } else if (file is String && file.startsWith("file:")) {
              request.files.add(
                await http.MultipartFile.fromPath(
                  fileNames[i],
                  file.replaceFirst("file:", ""),
                  filename: idDatabase['variables']["$vb.name"],
                ),
              );
            }
          }

          final response = await request.send();

          final body = await response.stream.bytesToString();

          if (response.statusCode == 200) {
            closeOverlay(context);

            final json = jsonDecode(body);

            for (final cbAction in List.from(json['callbacks'])) {
              ActionsPerf.perform(
                context,
                eventExec,
                cbAction['action'],
                cbAction['data'],
              );
            }
          } else {
            closeOverlay(context);
            eventExec(Events.INVOKE_TOAST, response.reasonPhrase ?? body);
          }

          return;
        }

        for (var vb in variables) {
          buildRequest[varNames[variables.indexOf(vb)]] =
              CoreParser.parseKVariable(idDatabase['variables'][vb]).toString();
        }

        showOverlay(
          context,
          DialogConfiguration(),
          builder: (ctx) => AlertDialog(
            content: SizedBox(
              width: 50,
              height: 50,
              child: Center(child: CircularProgressIndicator(size: 18)),
            ),
          ),
        );

        var response = await http.post(
          Uri.parse(widget.baseUrl + data['callbackPath']),
          body: buildRequest,
          headers: (data['headers'] is Map)
              ? Map.from(data['headers'])
              : {'User-agent': 'NeneUI/1.0'},
        );

        closeOverlay(context);

        if (response.statusCode == 200) {
          //closeOverlay(context);
          var json = jsonDecode(response.body);
          for (var cbAction in List.from(json['callbacks'])) {
            ActionsPerf.perform(
              context,
              eventExec,
              cbAction['action'],
              cbAction['data'],
            );
          }
        } else {
          // Navigator.of(context).pop();
          closeOverlay(context);
          eventExec(Events.INVOKE_TOAST, response.reasonPhrase);
        }
      } catch (error) {
        eventExec(Events.INVOKE_TOAST, "ERR:HTTP:$error");
      }
    }

    if (event == Events.SET_VAR) {
      setState(() {
        if ((idDatabase['variables'] as Map).containsKey(data['var'])) {
          idDatabase['variables'][data['var']] = data['val'];
        } else {
          idDatabase['variables'][data['var']] = data['val'];
        }
      });
    }
  }

  void initJs() {
    print(widget.path.toString().replaceAll(widget.baseUrl, ""));
    runtime.evaluate("""
      function action(name, mainData) {
        sendMessage('Action', JSON.stringify({ name, mainData }))
      }

      function setIntervalPolyfill(fn, ms) {
        let active = true;

        function tick() {
            if (!active) return;
            fn();
            setTimeout(tick, ms);
        }

        setTimeout(tick, ms);

        return {
            clear() {
                active = false;
            }
        };
    }

      function getVariable(variable){
        return sendMessage('getVariable', JSON.stringify({var: variable}))
      }
    """);

    runtime.onMessage("Action", (dynamic args) {
      print(args);
      ActionsPerf.perform(context, eventExec, args['name'], args['mainData']);
      return true;
    });

    runtime.onMessage("getVariable", (dynamic args) {
      return CoreParser.parseVariable({
        'template': "%1",
        'variable': "${args['var']}",
      }, idDatabase);
    });
  }

  void openDebugSlide() {
    showOverlay(
      context,
      SheetConfiguration(position: OverlayPosition.end),
      builder: (context) {
        return Container(
          padding: const EdgeInsets.all(24),
          constraints: const BoxConstraints(maxWidth: 400),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Expanded(
                      child: const Text('Daikon Debugger').large().medium(),
                    ),
                    TextButton(
                      density: ButtonDensity.icon,
                      child: const Icon(RadixIcons.cross1),
                      onPressed: () {
                        // Close the sheet without saving.
                        closeSheet(context);
                      },
                    ),
                  ],
                ),
                const Gap(8),
                SizedBox(
                  width: 1000,
                  child: PrimaryButton(
                    child: Text("Refresh User Interface"),
                    onPressed: () {
                      fetchUIRender();
                    },
                  ),
                ),
                const Gap(8),
                Collapsible(
                  children: [
                    const CollapsibleTrigger(child: Text("Daikon ID Database")),
                    OutlinedContainer(
                      child: Text(
                        "Id Database for Widgets Rendered by Daikon via NeneUI JSON",
                      ).small().mono().withPadding(horizontal: 16, vertical: 8),
                    ).withPadding(top: 8),
                    CollapsibleContent(
                      child: Column(
                        children: [
                          for (var id in idDatabase.keys)
                            if (id.contains("#"))
                              Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: SizedBox(
                                  width: 1000,
                                  child: Card(
                                    child: Column(
                                      mainAxisAlignment: .start,
                                      crossAxisAlignment: .start,
                                      children: [
                                        Row(
                                          mainAxisAlignment: .spaceBetween,
                                          children: [
                                            SizedBox(
                                              width: 190,
                                              child: Text(
                                                id.toString(),
                                                overflow: .ellipsis,
                                              ),
                                            ),
                                            IconButton(
                                              icon: Icon(LucideIcons.settings),
                                              variance: ButtonStyle.textIcon(),
                                              onPressed: () {
                                                setState(() {
                                                  idDatabase[id]['override'] =
                                                      idDatabase[id]['override']
                                                      ? false
                                                      : true;
                                                });
                                              },
                                            ),
                                            IconButton(
                                              icon: Icon(LucideIcons.eyeClosed),
                                              variance: ButtonStyle.textIcon(),
                                              onPressed: () {
                                                setState(() {
                                                  idDatabase[id]['visible'] =
                                                      idDatabase[id]['visible']
                                                      ? false
                                                      : true;
                                                });
                                              },
                                            ),
                                          ],
                                        ),
                                        const Divider(),
                                        TextField(
                                          controller: TextEditingController(
                                            text: JsonEncoder.withIndent(' ')
                                                .convert(idDatabase[id]),
                                          ),
                                          initialValue: JsonEncoder.withIndent(
                                            ' ',
                                          ).convert(idDatabase[id]),
                                          maxLines: 10,
                                          onChanged: (value) {
                                            setState(() {
                                              idDatabase[id] = jsonDecode(
                                                value,
                                              );
                                            });
                                          },
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                        ],
                      ),
                    ),
                  ],
                ),
                const Gap(10),
                Collapsible(
                  children: [
                    const CollapsibleTrigger(child: Text("Variables")),
                    OutlinedContainer(
                      child: Text(
                        "Id Database for Widgets Rendered by Daikon via NeneUI JSON",
                      ).small().mono().withPadding(horizontal: 16, vertical: 8),
                    ).withPadding(top: 8),
                    CollapsibleContent(
                      child: Column(
                        children: [
                          for (var variab in Map.from(
                            idDatabase['variables'],
                          ).keys)
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Card(
                                child: Column(
                                  mainAxisAlignment: .start,
                                  crossAxisAlignment: .start,
                                  children: [
                                    Text(variab),
                                    Text(
                                      idDatabase['variables'][variab]
                                          .toString(),
                                      style: TextStyle(fontSize: 8),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
                const Gap(10),
                const Text("Events Fired Recently")
                    .small()
                    .mono()
                    .withPadding(horizontal: 16, vertical: 8),
                for (var event in eventsFired)
                  if (event != "register_id") Text(event.toString()),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return erroredOut
        ? Text(errorText)
        : isUIProcessing
        ? widget.showScaffold
              ? Scaffold(
                  child: Center(child: const CircularProgressIndicator()),
                )
              : CircularProgressIndicator()
        : Daikon.Nene(
            context: context,
            idMap: idDatabase,
            ui: ui,
            setState: setState,
            path: widget.path,
            captureErrors: widget.captureErrors,
            plugins: widget.plugins,
            baseUrl: widget.baseUrl,
            event: eventExec,
          );
  }
}
