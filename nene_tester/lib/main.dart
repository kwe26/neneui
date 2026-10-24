import 'package:flutter/foundation.dart';
import 'package:neneui_video_plugin/neneui_video_plugin.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:neneui_render/neneui_render.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  NeneuiVideoPlugin.initPlugin();

  InitUI.initWeb();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ShadcnApp(
      title: "NeneUI Tester",
      theme: ThemeData(
        colorScheme: ColorSchemes.darkSlate,
        scaling: 1.08,
        surfaceOpacity: 0.8,
        surfaceBlur: 4.0,
      ),
      debugShowCheckedModeBanner: false,
      home: const UrlScreen(),
    );
  }
}

class UrlScreen extends StatefulWidget {
  const UrlScreen({super.key});

  @override
  State<UrlScreen> createState() => _UrlScreenState();
}

class _UrlScreenState extends State<UrlScreen> {
  final TextEditingController urlController = TextEditingController(
    text: "http://localhost:3500",
  );

  // NeneUI examples only.
  // Add your actual example URLs here.
  final List<Map<String, String>> examples = [
    {"name": "AI Chat with Sarvam", "url": "https://aichat.kwee26.tech"},
  ];

  // Recent launch history.
  final List<Map<String, String>> history = [];

  Map<String, dynamic> plugins = {};

  CheckboxState _state = CheckboxState.unchecked;

  bool get _isAndroid =>
      !kIsWeb && defaultTargetPlatform == TargetPlatform.android;

  @override
  void dispose() {
    urlController.dispose();
    super.dispose();
  }

  void _selectUrl(String url) {
    setState(() {
      urlController.text = url;
    });
  }

  void _recordHistory(String url) {
    final uri = Uri.tryParse(url);

    final name = uri != null && uri.host.isNotEmpty ? uri.host : url;

    // Move repeated URLs to the top instead of duplicating them.
    history.removeWhere((item) => item["url"] == url);

    history.insert(0, {"name": name, "url": url});

    // Keep at most ten entries.
    if (history.length > 10) {
      history.removeLast();
    }
  }

  void launchDemo() {
    final url = urlController.text.trim();

    if (url.isEmpty) return;

    final uri = Uri.tryParse(url);

    if (uri == null ||
        !uri.hasScheme ||
        (uri.scheme != "http" && uri.scheme != "https") ||
        uri.host.isEmpty) {
      return;
    }

    setState(() {
      _recordHistory(url);
    });

    Navigator.of(context).pushAndRemoveUntil(
      ShadcnPageRoute(
        builder: (ctx) => NenePreview(
          url: url,
          plugins: Map<String, dynamic>.from(plugins),
          enableOrb: _state == CheckboxState.checked,
        ),
      ),
      (route) => false,
    );
  }

  Widget _buildUrlEntry(Map<String, String> item, {bool isHistory = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: SizedBox(
        width: double.infinity,
        child: SecondaryButton(
          leading: Icon(isHistory ? LucideIcons.history : RadixIcons.globe),
          onPressed: () => _selectUrl(item["url"]!),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(item["name"] ?? "NeneUI Example"),
              Text(item["url"]!, style: const TextStyle(fontSize: 11)),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned.fill(
          child: ColoredBox(
            color: Theme.of(context).colorScheme.primaryForeground,
          ),
        ),
        // Original image position and dimensions preserved.
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
          headers: [
            AppBar(
              title: Text("NeneUI Testing Kit"),
              trailing: [
                IconButton(
                  icon: Icon(LucideIcons.package),
                  variance: ButtonStyle.card(),
                  onPressed: () {
                    launchUrl(Uri.parse("https://www.npmjs.com/@neneys/ui"));
                  },
                ),
                IconButton(
                  icon: Icon(LucideIcons.github),
                  variance: ButtonStyle.card(),
                  onPressed: () {
                    launchUrl(Uri.parse("https://github.com/kwe26/neneui"));
                  },
                ),
              ],
            ),
          ],
          footers: [
            // Original footer behavior preserved.
            // _isAndroid
            //     ? const SizedBox()
            //     : SizedBox(
            //         width: 1000,
            //         child: Row(
            //           mainAxisAlignment: .center,
            //           crossAxisAlignment: .center,
            //           children: [
            //             Padding(
            //               padding: const EdgeInsets.all(3.0),
            //               child: SizedBox(
            //                 width: 180,
            //                 height: 100,
            //                 child: Center(
            //                   child: SecondaryButton(
            //                     leading: Icon(RadixIcons.githubLogo),
            //                     child: const Text("Source"),
            //                     onPressed: () {
            //                       launchUrl(
            //                         Uri.parse(
            //                           "https://github.com/kwe26/neneui",
            //                         ),
            //                       );
            //                     },
            //                   ),
            //                 ),
            //               ),
            //             ),

            //             Padding(
            //               padding: const EdgeInsets.all(3.0),
            //               child: SizedBox(
            //                 width: 180,
            //                 height: 100,
            //                 child: Center(
            //                   child: SecondaryButton(
            //                     leading: Icon(RadixIcons.box),
            //                     child: const Text("NPM Pkg"),
            //                     onPressed: () {
            //                       launchUrl(
            //                         Uri.parse(
            //                           "https://www.npmjs.com/@neneys/ui",
            //                         ),
            //                       );
            //                     },
            //                   ),
            //                 ),
            //               ),
            //             ),
            //           ],
            //         ),
            //       ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: SizedBox(
                width: 100,
                height: 100,
                child: Center(
                  child: HoverCard(
                    hoverBuilder: (context) {
                      return _isAndroid
                          ? const SizedBox()
                          : SurfaceCard(
                              child: Basic(
                                title: const Text('Are You Sure?'),
                                content: Column(
                                  children: [
                                    const Text(
                                      'Once you launch the app, you will need to restart the app to launch another URL.',
                                    ),

                                    const SizedBox(height: 10),

                                    PrimaryButton(
                                      onPressed: launchDemo,
                                      child: const Text("Yes, Continue"),
                                    ),
                                  ],
                                ),
                              ),
                            ).sized(width: 300);
                    },

                    child: SecondaryButton(
                      leading: Icon(RadixIcons.play),
                      child: const Text("Launch App"),
                      onPressed: () {
                        launchDemo();
                      },
                    ),
                  ),
                ),
              ),
            ),
          ],

          child: Center(
            child: SizedBox(
              width: 390,
              height: MediaQuery.of(context).size.height - 300,
              child: Card(
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      // Original heading.
                      Row(
                        mainAxisAlignment: .spaceEvenly,
                        children: [
                          Icon(RadixIcons.code, size: 28),
                          const Text(
                            "NeneUI Testing Kit",
                            style: TextStyle(fontSize: 28),
                          ),
                        ],
                      ),

                      const SizedBox(height: 10),
                      const Divider(),
                      const SizedBox(height: 10),

                      // URL input.
                      TextField(
                        controller: urlController,
                        placeholder: const Text("Enter the Url"),
                        onSubmitted: (value) => launchDemo(),
                      ),

                      const SizedBox(height: 10),
                      const Divider(),
                      const SizedBox(height: 10),

                      Checkbox(
                        state: _state,
                        size: 20,
                        onChanged: (value) {
                          setState(() {
                            _state = value;
                          });
                        },
                        trailing: const Text('Enable Debug Bar/Orb'),
                      ),

                      const SizedBox(height: 10),
                      const Divider(),

                      // -------------------------------------
                      // NENEUI EXAMPLES
                      // -------------------------------------
                      const Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          "NeneUI Examples",
                          style: TextStyle(fontSize: 18),
                        ),
                      ),

                      const SizedBox(height: 10),

                      if (examples.isEmpty)
                        const Text("No examples available.")
                      else
                        ...examples.map((example) => _buildUrlEntry(example)),

                      const SizedBox(height: 8),
                      const Divider(),

                      // -------------------------------------
                      // HISTORY
                      // -------------------------------------
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text("History", style: TextStyle(fontSize: 18)),

                          if (history.isNotEmpty)
                            SecondaryButton(
                              onPressed: () {
                                setState(() {
                                  history.clear();
                                });
                              },
                              child: const Text("Clear"),
                            ),
                        ],
                      ),

                      const SizedBox(height: 10),

                      if (history.isEmpty)
                        const Padding(
                          padding: EdgeInsets.all(8.0),
                          child: Text("No URLs launched yet."),
                        )
                      else
                        ...history.map(
                          (item) => _buildUrlEntry(item, isHistory: true),
                        ),

                      const SizedBox(height: 10),

                      // -------------------------------------
                      // PLUGINS
                      // -------------------------------------
                      const Text("Plugins: ", style: TextStyle(fontSize: 18)),

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

                      const SizedBox(height: 10),

                      // Original payments plugin placeholder
                      // retained for future use.
                      //
                      // SizedBox(
                      //   width: 1000,
                      //   height: 40,
                      //   child: GestureDetector(
                      //     onTap: () {
                      //       setState(() {
                      //         if (plugins.containsKey("pay")) {
                      //           plugins.remove("pay");
                      //         } else {
                      //           plugins.addAll({
                      //             "pay": NeneuiPaymentsPlugin.manifest(),
                      //           });
                      //         }
                      //       });
                      //     },
                      //     child: Container(
                      //       decoration: BoxDecoration(
                      //         border: Border.all(color: Colors.white),
                      //         borderRadius: BorderRadius.circular(10),
                      //       ),
                      //       child: Center(
                      //         child: Text(
                      //           "Payments Plugin [${plugins.containsKey("pay") ? "ENABLED" : "DISABLED"}]",
                      //         ),
                      //       ),
                      //     ),
                      //   ),
                      // ),
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

// -----------------------------------------
// NENEUI PREVIEW
// -----------------------------------------

class NenePreview extends StatelessWidget {
  final String url;
  final bool enableOrb;
  final Map<String, dynamic> plugins;

  const NenePreview({
    super.key,
    required this.url,
    required this.plugins,
    required this.enableOrb,
  });

  @override
  Widget build(BuildContext context) {
    return InitUI.init(
      baseUrl: url,
      title: 'NeneUI Testing Kit',
      plugins: plugins,
      debugOrb: enableOrb,
      debugShowCheckedModeBanner: false,
    );
  }
}
