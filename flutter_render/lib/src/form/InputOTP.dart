import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Actions.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class DInputOTP {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Map<String, dynamic> idDatabase,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "InputOTP") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      final controllerKey = "${data['id']}.controller";

      if (!idDatabase['variables'].containsKey(controllerKey)) {
        event(Events.SET_VAR, {'var': controllerKey, 'val': ''});
      }

      InputOTPChild reRenderI(ui) {
        if (ui['name'] == "InputOTPCharacter") {
          return InputOTPChild.character(
            allowDigit: bool.parse(ui['props']['allowDigit'].toString()),
            allowLowercaseAlphabet: bool.parse(
              ui['props']['allowLowercaseAlphabet'].toString(),
            ),
            allowUppercaseAlphabet: bool.parse(
              ui['props']['allowUppercaseAlphabet'].toString(),
            ),
            onlyLowercaseAlphabet: bool.parse(
              ui['props']['onlyLowercaseAlphabet'].toString(),
            ),
            onlyUppercaseAlphabet: bool.parse(
              ui['props']['onlyUppercaseAlphabet'].toString(),
            ),
            readOnly: bool.parse(ui['props']['readOnly'].toString()),
            obscured: bool.parse(ui['props']['obscured'].toString()),
          );
        }

        if (ui == "InputOTPSpace") return .space;
        if (ui == "InputOTPSeparator") return .separator;
        if (ui == "InputOTPEmpty") return .empty;

        return InputOTPChild.empty;
      }

      return InputOTP(
        initialValue: data['props']['initialValue'].toString().codeUnits,
        onChanged: (value) {
          event(Events.SET_VAR, {
            'var': controllerKey,
            'val': value.otpToString(),
          });

          if (data['props']['onChanged'] != null) {
            ActionsPerf.perform(
              context,
              event,
              data['props']['onChanged']['action'],
              data['props']['onChanged']['data'],
            );
          }
        },
        onSubmitted: (value) {
          event(Events.SET_VAR, {
            'var': controllerKey,
            'val': value.otpToString(),
          });

          if (data['props']['onSubmitted'] != null) {
            ActionsPerf.perform(
              context,
              event,
              data['props']['onSubmitted']['action'],
              data['props']['onSubmitted']['data'],
            );
          }
        },
        children: [
          for (var ui in List.from(data['props']['children'])) reRenderI(ui),
        ],
      );
    } else {
      return SizedBox();
    }
  }
}
