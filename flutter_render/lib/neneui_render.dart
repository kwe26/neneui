import 'dart:convert';
import 'package:flutter/material.dart' show SnackBar, ScaffoldMessenger;
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
      home: NeneUIMain(path: "$baseUrl$defaultPage", baseUrl: baseUrl),
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
  Map<String, dynamic> idDatabase = {};

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
        headers: {"User-Agent": "NeneUI/1.0"},
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

  @override
  Widget build(BuildContext context) {
    return erroredOut
        ? Text(errorText)
        : isUIProcessing
        ? SingleChildScrollView(
            child: Center(child: const CircularProgressIndicator()),
          )
        : Daikon.Nene(
            context: context,
            idMap: idDatabase,
            ui: ui,
            event: (event, data) {
              if (event == Events.REGISTER_ID) {
                setState(() {
                  idDatabase.addAll({
                    '${data['id']}': {'visible': true},
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
                  setState(() {
                    idDatabase[data]['visible'] = false;
                  });
                }
              }

              if (event == Events.SHOW_IDB) {
                if (idDatabase.containsKey(data)) {
                  setState(() {
                    idDatabase[data]['visible'] = true;
                  });
                }
              }
            },
          );
  }
}
