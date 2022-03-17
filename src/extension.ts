// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { RubberDuckerPanel } from "./RubberDuckerPanel";
import { SidebarProvider } from "./SidebarProvider";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "rubber-ducker-sidebar",
      sidebarProvider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("rubber-ducker-2.addTodo", () => {
      const { activeTextEditor } = vscode.window;

      if (!activeTextEditor) {
        vscode.window.showInformationMessage("no text selected");
        return;
      }

      const text = activeTextEditor?.document.getText(
        activeTextEditor?.selection
      );

      sidebarProvider._view?.webview.postMessage({
        type: "newTodo",
        text,
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("rubber-ducker-2.helloWorld", () => {
      RubberDuckerPanel.createOrShow(context.extensionUri);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("rubber-ducker-2.refresh", async () => {
      RubberDuckerPanel.kill();
      RubberDuckerPanel.createOrShow(context.extensionUri);
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.view.extension.rubber-ducker-sidebar-view"
      );

      setTimeout(() => {
        vscode.commands.executeCommand(
          "workbench.action.webview.openDeveloperTools"
        );
      }, 1000);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("rubber-ducker-2.doSomething", async () => {
      const answer = await vscode.window.showInformationMessage(
        "this is somehting coool",
        "good",
        "bad"
      );

      if (answer === "bad") {
        vscode.window.showInformationMessage("soz");
      }

      console.log(answer);
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
