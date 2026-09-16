import 'dart:convert';

import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:webview_all/webview_all.dart';

class NeneuiPaymentsPlugin {
  static Map<String, dynamic> manifest() {
    return {
      'plugin': 'nene_payments',
      'actionResolver':
          (BuildContext context, Map<String, dynamic> data, Function callback) {
            if (data.containsKey("onFailure")) {
              if (data.containsKey("onSuccess")) {
                if (data.containsKey("payment")) {
                  Map<String, dynamic> Payment = data['payment'];
                  if (Payment.containsKey("url")) {
                    late WebViewController controller;

                    controller = WebViewController()
                      ..setJavaScriptMode(JavaScriptMode.unrestricted)
                      ..addJavaScriptChannel(
                        'NeneConsole',
                        onMessageReceived: (message) {
                          try {
                            final result = jsonDecode(message.message);

                            if (result['type'] == 'success') {
                              final success = data['onSuccess'];

                              if (success is Map<String, dynamic>) {
                                final callbackData = success['data'];

                                callback({
                                  'action': success['action'],
                                  'data': callbackData is Map<String, dynamic>
                                      ? {
                                          ...callbackData,
                                          'payment': result['payment'],
                                        }
                                      : callbackData,
                                });

                                Navigator.of(context).pop();
                              }
                            }

                            if (result['type'] == 'failed') {
                              final failure = data['onFailure'];

                              if (failure is Map<String, dynamic>) {
                                final callbackData = failure['data'];

                                callback({
                                  'action': failure['action'],
                                  'data': callbackData is Map<String, dynamic>
                                      ? {
                                          ...callbackData,
                                          'payment': result['payment'],
                                        }
                                      : callbackData,
                                });

                                Navigator.of(context).pop();
                              }
                            }
                          } catch (e) {
                            debugPrint('Nene Payments callback error: $e');
                          }
                        },
                      )
                      ..loadRequest(Uri.parse(Payment['url']));

                    Navigator.of(context).push(
                      ShadcnPageRoute(
                        builder: (ctx) {
                          return Scaffold(
                            headers: [
                              AppBar(
                                leading: [
                                  IconButton(
                                    icon: Icon(LucideIcons.arrowLeft),
                                    variance: ButtonStyle.linkIcon(),
                                    onPressed: () {
                                      callback(data['onFailure']);
                                      Navigator.of(context).pop();
                                    },
                                  ),
                                ],
                                title: Text("Payment System"),
                              ),
                            ],
                            child: WebViewWidget(controller: controller),
                          );
                        },
                      ),
                    );
                  }
                }
              } else {
                callback(data['onFailure']);
              }
            } else {
              callback(null);
            }
          },
      'widgetResolver':
          (
            BuildContext context,
            Map<String, dynamic> data,
            Function reRender,
            Function event,
          ) {
            return SizedBox();
          },
    };
  }
}
