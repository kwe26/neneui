use eframe::egui;

struct RadishApp {
    count: i32,
    show_button: bool,
}

impl Default for RadishApp {
    fn default() -> Self {
        Self {
            count: 0,
            show_button: true,
        }
    }
}

impl eframe::App for RadishApp {
    fn update(
        &mut self,
        ctx: &egui::Context,
        _frame: &mut eframe::Frame,
    ) {
        egui::CentralPanel::default().show(ctx, |ui| {
            ui.vertical_centered(|ui| {
                ui.add_space(80.0);

                ui.heading("NeneUI");
                ui.label("Rendered by Radish");

                ui.add_space(20.0);

                if self.show_button {
                    if ui.button(format!("Count: {}", self.count)).clicked() {
                        self.count += 1;
                    }
                }

                ui.add_space(10.0);

                if ui
                    .button(if self.show_button {
                        "Hide Button"
                    } else {
                        "Show Button"
                    })
                    .clicked()
                {
                    self.show_button = !self.show_button;
                }
            });
        });

        // Ask egui to keep updating while we're testing.
        ctx.request_repaint();
    }
}

#[cfg(not(target_arch = "wasm32"))]
fn main() -> eframe::Result<()> {
    let options = eframe::NativeOptions {
        renderer: eframe::Renderer::Wgpu,
        ..Default::default()
    };

    eframe::run_native(
        "Radish — NeneUI Renderer",
        options,
        Box::new(|_cc| Ok(Box::new(RadishApp::default()))),
    )
}

#[cfg(target_arch = "wasm32")]
fn main() {
    use wasm_bindgen::JsCast;
    use web_sys::HtmlCanvasElement;

    wasm_bindgen_futures::spawn_local(async {
        let window = web_sys::window().expect("no global window");
        let document = window.document().expect("no document");

        let canvas = document
            .get_element_by_id("radish_canvas")
            .expect("radish_canvas not found")
            .dyn_into::<HtmlCanvasElement>()
            .expect("radish_canvas is not a canvas");

        let web_options = eframe::WebOptions {
            ..Default::default()
        };

        eframe::WebRunner::new()
            .start(
                canvas,
                web_options,
                Box::new(|_cc| Ok(Box::new(RadishApp::default()))),
            )
            .await
            .expect("failed to start Radish");
    });
}