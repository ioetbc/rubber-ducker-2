// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { RubberDuckerPanel } from "./RubberDuckerPanel";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("rubber-ducker-2.helloWorld", () => {
      RubberDuckerPanel.createOrShow(context.extensionUri);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("rubber-ducker-2.refresh", () => {
      RubberDuckerPanel.kill();
      RubberDuckerPanel.createOrShow(context.extensionUri);

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
