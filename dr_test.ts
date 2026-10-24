import { NeneDesktop } from "@neneys/ui"

NeneDesktop({
  runtimeDir: "D:\\ProjectAB\\neneui\\nene_desktop_runtime\\build\\windows\\x64\\runner\\Release\\nene_desktop_runtime.exe",
  interfaces: "./example_ui",
  callbacks: "./example_callback",
  appId: "com.neneui.example",
  appIcon: "",
  appTitle: "Desktop Runtime Test",
})
