import 'package:neneui_video_plugin/neneui_video_plugin.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:neneui_render/neneui_render.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  NeneuiVideoPlugin.initPlugin();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ShadcnApp(
      title: "NeneUI Tester",
      theme: ThemeData(
        colorScheme: ColorSchemes.darkNeutral,
        scaling: 2,
        surfaceOpacity: 0.8,
        surfaceBlur: 4.0,
      ),
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
  Map<String, dynamic> plugins = {};

  @override
  void dispose() {
    urlController.dispose();
    super.dispose();
  }

  void launchDemo() {
    final url = urlController.text.trim();

    if (url.isEmpty) return;

    Navigator.of(context).pushReplacement(
      ShadcnPageRoute(
        builder: (ctx) => NenePreview(url: url, plugins: plugins),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned(
          right: -50,
          bottom: -40,
          child: ColorFiltered(
            colorFilter: const ColorFilter.mode(Colors.white, BlendMode.srcIn),
            child: Image.asset('assets/nene.png', width: 350),
          ),
        ),
        Scaffold(
          backgroundColor: Colors.transparent,
          footers: [
            SizedBox(
              width: 1000,
              child: Row(
                mainAxisAlignment: .center,
                crossAxisAlignment: .center,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(3.0),
                    child: SizedBox(
                      width: 180,
                      height: 100,
                      child: Center(
                        child: SecondaryButton(
                          leading: Icon(RadixIcons.githubLogo),
                          child: Text("Source"),
                          onPressed: () {
                            launchUrl(
                              Uri.parse("https://github.com/kwe26/neneui"),
                            );
                          },
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(3.0),
                    child: SizedBox(
                      width: 180,
                      height: 100,
                      child: Center(
                        child: SecondaryButton(
                          leading: Icon(RadixIcons.box),
                          child: Text("NPM Pkg"),
                          onPressed: () {
                            launchUrl(
                              Uri.parse("https://www.npmjs.com/@neneys/ui"),
                            );
                          },
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: SizedBox(
                width: 100,
                height: 100,
                child: Center(
                  child: HoverCard(
                    hoverBuilder: (context) {
                      return SurfaceCard(
                        child: Basic(
                          title: Text('Are You Sure?'),
                          content: Column(
                            children: [
                              Text(
                                'Once you Launch the App, To Launch Other URL you have to restart the entire app.!',
                              ),
                              const SizedBox(height: 10),
                              PrimaryButton(
                                child: Text("Yes, Continue"),
                                onPressed: () => launchDemo(),
                              ),
                            ],
                          ),
                        ),
                      ).sized(width: 300);
                    },
                    child: SecondaryButton(
                      leading: Icon(RadixIcons.play),
                      child: Text("Launch App"),
                      onPressed: () {
                        //launchDemo();
                      },
                    ),
                  ),
                ),
              ),
            ),
          ],
          child: Center(
            child: SizedBox(
              width: 340,
              height: MediaQuery.of(context).size.height - 400,
              child: Card(
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: .spaceEvenly,
                        children: [
                          Icon(RadixIcons.code, size: 28),
                          Text(
                            "NeneUI Testing Kit",
                            style: TextStyle(fontSize: 28),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      const Divider(),
                      const SizedBox(height: 10),
                      TextField(
                        controller: urlController,
                        placeholder: Text("Enter the Url"),
                        onSubmitted: (value) => launchDemo(),
                      ),
                      const SizedBox(height: 10),
                      const Divider(),
                      const SizedBox(height: 10),
                      Text("Plugins: ", style: TextStyle(fontSize: 18)),
                      const SizedBox(height: 10),
                      SizedBox(
                        width: 1000,
                        height: 40,
                        child: GestureDetector(
                          onTap: () {
                            setState(() {
                              if (plugins.containsKey("video")) {
                                plugins.remove("video");
                              } else {
                                plugins.addAll({
                                  "video": NeneuiVideoPlugin.manifest(),
                                });
                              }
                            });
                          },
                          child: Container(
                            decoration: BoxDecoration(
                              border: Border.all(color: Colors.white),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Center(
                              child: Text(
                                "Video Plugin [${plugins.containsKey("video") ? "ENABLED" : "DISABLED"}]",
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class NenePreview extends StatelessWidget {
  final String url;
  final Map<String, dynamic> plugins;

  const NenePreview({super.key, required this.url, required this.plugins});

  @override
  Widget build(BuildContext context) {
    return InitUI.init(
      baseUrl: url,
      title: 'NeneUI Tester',
      plugins: plugins,
      debugShowCheckedModeBanner: false,
    );
  }
}
