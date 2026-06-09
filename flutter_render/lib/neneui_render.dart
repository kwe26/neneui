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
      home: NeneUIMain(path: "$baseUrl$defaultPage"),
    );
  }
}

class NeneUIMain extends StatefulWidget {
  final String path;

  const NeneUIMain({super.key, required this.path});

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
            },
          );
  }
}
