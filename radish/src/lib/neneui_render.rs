use std::collections::HashMap;
use eframe::egui;
use serde_json::Value;

#[derive(Debug, Clone)]
pub struct WidgetState {
    pub visible: bool,
    pub override_props: bool,
    pub props: Value,
}

pub struct NeneUIRenderer {
    pub base_url: String,

    pub loading: bool,
    pub errored: bool,
    pub error_text: String,

    pub ui: Option<Value>,

    pub id_database: HashMap<String, WidgetState>,
    pub events_fired: Vec<String>,
}

impl NeneUIRenderer {
    pub fn new(base_url: String) -> Self {
        Self {
            base_url,
            loading: true,
            errored: false,
            error_text: String::new(),
            ui: None,
            id_database: HashMap::new(),
            events_fired: Vec::new(),
        }
    }

    pub async fn fetch_ui(&mut self) {
        self.loading = true;
        self.errored = false;
        self.error_text.clear();

        let url = format!("{}/ui/main", self.base_url);

        match reqwest::get(&url).await {
            Ok(response) => {
                if response.status().is_success() {
                    match response.json::<Value>().await {
                        Ok(json) => {
                            self.ui = Some(json);
                            self.loading = false;
                        }

                        Err(error) => {
                            self.loading = false;
                            self.errored = true;
                            self.error_text =
                                format!("Failed to parse UI JSON: {}", error);
                        }
                    }
                } else {
                    self.loading = false;
                    self.errored = true;
                    self.error_text = format!(
                        "HTTP {}",
                        response.status().as_u16()
                    );
                }
            }

            Err(error) => {
                self.loading = false;
                self.errored = true;
                self.error_text =
                    format!("HTTP request failed: {}", error);
            }
        }
    }

    pub fn render(&mut self, ctx: &egui::Context) {
        egui::CentralPanel::default().show(ctx, |ui| {
            if self.loading {
                ui.vertical_centered(|ui| {
                    ui.add_space(100.0);
                    ui.spinner();
                    ui.add_space(10.0);
                    ui.label("Loading NeneUI...");
                });

                return;
            }

            if self.errored {
                ui.vertical_centered(|ui| {
                    ui.heading("Something went wrong");
                    ui.label(&self.error_text);
                });

                return;
            }

            if let Some(ui_json) = &self.ui {
                ui.vertical_centered(|ui| {
                    ui.heading("NeneUI loaded!");
                    ui.label(
                        format!("JSON: {}", ui_json)
                    );
                });
            }
        });
    }
}