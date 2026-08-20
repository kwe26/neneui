import 'dart:convert';
import 'package:flutter_js/flutter_js.dart';
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
  final bool debugShowCheckedModeBanner;
  final ThemeData fallbackTheme;
  final String defaultPage;

  const _NeneUIInitializer({
    required this.baseUrl,
    required this.title,
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

  late Future<(ThemeData, ThemeData)> _themeFuture;

  Future<(ThemeData, ThemeData)> _loadThemes() async {
    final response = await http.get(Uri.parse("${widget.baseUrl}/__neneui__"));

    final data = jsonDecode(response.body);
    final appTheme = data["appTheme"];

    final light = appTheme["light"];
    final dark = appTheme["dark"];

    return (ThemeParser.parseTheme(light), ThemeParser.parseThemeDark(dark));
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<(ThemeData, ThemeData)>(
      future: _themeFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return ShadcnApp(
            title: widget.title,
            theme: widget.fallbackTheme,
            home: const Scaffold(
              child: Center(child: CircularProgressIndicator()),
            ),
          );
        }

        if (snapshot.hasError) {
          // print("NeneUI initialization error: ${snapshot.error}");
          // print(snapshot.stackTrace);

          return ShadcnApp(
            title: widget.title,
            theme: widget.fallbackTheme,
            home: Scaffold(
              child: Center(
                child: Text(
                  "Failed to initialize NeneUI:\n\n${snapshot.error}",
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          );
        }

        final (lightTheme, darkTheme) = snapshot.data!;

        return ShadcnApp(
          title: widget.title,
          theme: lightTheme,
          darkTheme: darkTheme,
          debugShowCheckedModeBanner: widget.debugShowCheckedModeBanner,
          home: DrawerOverlay(
            child: NeneUIMain(
              path: "${widget.baseUrl}${widget.defaultPage}",
              baseUrl: widget.baseUrl,
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
  final bool showScaffold;

  const NeneUIMain({
    super.key,
    required this.baseUrl,
    required this.path,
    required this.showScaffold,
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
  final runtime = getJavascriptRuntime();

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
      print(data['types']);
      FilePickerResult? result = await FilePicker.pickFiles(
        allowMultiple: false,
        dialogTitle: data['title'],
        type: FileType.custom,
        withData: true,
        allowedExtensions: data['types'].toString().split(","),
      );

      if (result == null) return;

      PlatformFile file = result.files.first;

      setState(() {
        idDatabase['variables'][data['variable']] = ".file,.name,.size";
        idDatabase['variables'][data['variable'] + ".file"] = file.bytes;
        idDatabase['variables'][data['variable'] + ".name"] = file.name;
        idDatabase['variables'][data['variable'] + ".size"] = file.size;
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
        MaterialPageRoute(
          builder: (ctx) => NeneUIMain(
            path: "${widget.baseUrl}$data",
            baseUrl: widget.baseUrl,
            showScaffold: true,
          ),
        ),
      );
    }

    if (event == Events.INVOKE_NAVIGATE_REPLACE) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (ctx) => NeneUIMain(
            path: "${widget.baseUrl}$data",
            baseUrl: widget.baseUrl,
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
                child: const Icon(Icons.close),
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
          builder: (context) => Daikon.Nene(
            context: context,
            idMap: idDatabase,
            ui: data,
            baseUrl: widget.baseUrl,
            event: eventExec,
            setState: setState,
          ),
          barrierDismissible: (data as Map).containsKey("props")
              ? bool.parse(data['props']['barrierDismissible'].toString())
              : true,
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
            DialogConfiguration(
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
            ),
          );

          final request = ProgressMultipartRequest(
            "POST",
            Uri.parse(widget.baseUrl + data['callbackPath']),
            onProgress: (sent, total) {
              progress.value = sent / total;
            },
          );

          for (var vb in variables) {
            request.fields[varNames[variables.indexOf(
              vb,
            )]] = CoreParser.parseKVariable(
              idDatabase['variables'][vb],
            ).toString();
          }

          for (var vb in fileVariables) {
            request.files.add(
              http.MultipartFile.fromBytes(
                fileNames[fileVariables.indexOf(vb)],
                idDatabase['variables']["$vb.file"],
                filename: idDatabase['variables']["$vb.name"],
              ),
            );
          }

          final response = await request.send();

          final body = await response.stream.bytesToString();

          if (response.statusCode == 200) {
            Navigator.of(context).pop();

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
            Navigator.of(context).pop();
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
          DialogConfiguration(
            builder: (ctx) => AlertDialog(
              content: SizedBox(
                width: 50,
                height: 50,
                child: Center(child: CircularProgressIndicator(size: 18)),
              ),
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

        if (response.statusCode == 200) {
          Navigator.of(context).pop();
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
          Navigator.of(context).pop();
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
      SheetConfiguration(
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
                        child: const Icon(Icons.close),
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
                      const CollapsibleTrigger(
                        child: Text("Daikon ID Database"),
                      ),
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
                                                icon: Icon(Icons.settings),
                                                variance:
                                                    ButtonStyle.textIcon(),
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
                                                icon: Icon(Icons.hide_image),
                                                variance:
                                                    ButtonStyle.textIcon(),
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
                                              text: JsonEncoder.withIndent(
                                                ' ',
                                              ).convert(idDatabase[id]),
                                            ),
                                            initialValue:
                                                JsonEncoder.withIndent(
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
                  const Text(
                    "Events Fired Recently",
                  ).small().mono().withPadding(horizontal: 16, vertical: 8),
                  for (var event in eventsFired)
                    if (event != "register_id") Text(event.toString()),
                ],
              ),
            ),
          );
        },
        position: OverlayPosition.end,
      ),
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
            baseUrl: widget.baseUrl,
            event: eventExec,
          );
  }
}
