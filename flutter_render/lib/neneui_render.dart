import 'dart:convert';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/render.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:http/http.dart' as http;

class InitUI {
  static Widget init({
    required String baseUrl,
    required String title,
    bool debugShowCheckedModeBanner = true,
    ThemeData theme = const ThemeData(colorScheme: ColorSchemes.lightNeutral),
    String defaultPage = "/ui/main",
  }) {
    return ShadcnApp(
      title: title,
      theme: theme,
      debugShowCheckedModeBanner: debugShowCheckedModeBanner,
      home: DrawerOverlay(
        child: NeneUIMain(path: "$baseUrl$defaultPage", baseUrl: baseUrl),
      ),
    );
  }
}

class NeneUIMain extends StatefulWidget {
  final String path;
  final String baseUrl;

  const NeneUIMain({super.key, required this.baseUrl, required this.path});

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

  void openDebugSlide() {
    openSheet(
      context: context,
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
                                              icon: Icon(Icons.settings),
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
                                              icon: Icon(Icons.hide_image),
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
                                            text: JsonEncoder.withIndent(
                                              ' ',
                                            ).convert(idDatabase[id]),
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
    );
  }

  @override
  Widget build(BuildContext context) {
    return erroredOut
        ? Text(errorText)
        : isUIProcessing
        ? Scaffold(child: Center(child: const CircularProgressIndicator()))
        : Daikon.Nene(
            context: context,
            idMap: idDatabase,
            ui: ui,
            setState: setState,
            baseUrl: widget.baseUrl,
            event: (event, data) {
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

              if (event == Events.INVOKE_NAVIGATE) {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (ctx) => NeneUIMain(
                      path: "${widget.baseUrl}$data",
                      baseUrl: widget.baseUrl,
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
                    ),
                  ),
                );
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
                showDialog(
                  context: context,
                  builder: (context) => Daikon.Nene(
                    context: context,
                    idMap: idDatabase,
                    ui: data,
                    baseUrl: widget.baseUrl,
                    event: event,
                    setState: setState,
                  ),
                );
              }

              if (event == Events.SET_VAR) {
                setState(() {
                  if ((idDatabase['variables'] as Map).containsKey(
                    data['var'],
                  )) {
                    idDatabase['variables'][data['var']] = data['val'];
                  } else {
                    idDatabase['variables'][data['var']] = data['val'];
                  }
                });
              }
            },
          );
  }
}
