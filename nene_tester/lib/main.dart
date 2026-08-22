import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:neneui_render/neneui_render.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ShadcnApp(
      title: "NeneUI Tester",
      debugShowCheckedModeBanner: false,
      home: UrlScreen(),
    );
  }
}

class UrlScreen extends StatefulWidget {
  const UrlScreen({super.key});
  @override
  State<UrlScreen> createState() => _UrlScreenState();
}

class _UrlScreenState extends State<UrlScreen> {
  final urlController = TextEditingController(text: "http://localhost:3500");

  @override
  void dispose() {
    urlController.dispose();
    super.dispose();
  }

  void launchDemo() {
    final url = urlController.text.trim();

    if (url.isEmpty) return;

    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (ctx) => NenePreview(url: url)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 300),
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              children: [
                Icon(LucideIcons.code, size: 48),
                Gap(20),
                Text(
                  'Enter an @neneys/ui Server URL to preview it\'s interface MUST NOT CONTAIN \\ / or any path. The Server must have /ui/main registered route ',
                ),
                Gap(24),
                TextField(
                  controller: urlController,
                  placeholder: Text("http://localhost:3500"),
                  onSubmitted: (value) => launchDemo(),
                ),
                Gap(8),
                PrimaryButton(
                  onPressed: () => launchDemo(),
                  child: Row(
                    children: [
                      Icon(Icons.play_arrow),
                      SizedBox(width: 4),
                      Text("Launch"),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class NenePreview extends StatelessWidget {
  final String url;

  const NenePreview({super.key, required this.url});

  @override
  Widget build(BuildContext context) {
    return InitUI.init(
      baseUrl: url,
      title: 'NeneUI Tester',
      debugShowCheckedModeBanner: false,
    );
  }
}
