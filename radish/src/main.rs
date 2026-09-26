mod lib;

use lib::neneui_render::NeneUIRenderer;
use eframe::egui;

struct RadishApp {
    renderer: NeneUIRenderer,
}

impl RadishApp {
    fn new() -> Self {
        Self {
            renderer: NeneUIRenderer::new(
                "http://localhost:3500".to_string(),
            ),
        }
    }
}

impl eframe::App for RadishApp {
    fn update(
        &mut self,
        ctx: &egui::Context,
        _frame: &mut eframe::Frame,
    ) {
        self.renderer.render(ctx);

        // Keep the UI responsive while async work is running.
        ctx.request_repaint();
    }
}

fn main() -> eframe::Result<()> {
    let options = eframe::NativeOptions {
        renderer: eframe::Renderer::Wgpu,
        ..Default::default()
    };

    eframe::run_native(
        "Radish — NeneUI Renderer",
        options,
        Box::new(|_cc| {
            Ok(Box::new(RadishApp::new()))
        }),
    )
}

#[cfg(target_arch = "wasm32")]
fn main() {
    use wasm_bindgen::JsCast;
    use web_sys::HtmlCanvasElement;

    wasm_bindgen_futures::spawn_local(async {
        let window = web_sys::window()
            .expect("no global window");

        let document = window
            .document()
            .expect("no document");

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
                Box::new(|_cc| {
                    Ok(Box::new(RadishApp::new()))
                }),
            )
            .await
            .expect("failed to start Radish");
    });
}