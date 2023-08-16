// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const nanoid = require("nanoid");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "uuid-generator" is now active!');

	const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
	const upperLetters = lowerLetters.toUpperCase();
	const letters = lowerLetters + upperLetters;
	const numbers = "0123456789";
	const hex = "0123456789abcdef";
	const alphanumeric = letters + numbers;

	const alphabets = { lowerLetters, upperLetters, letters, numbers, hex, alphanumeric, custom: "" };

	let configs = vscode.workspace.getConfiguration("nanoid-gen").get("configurations");
	if (!configs || configs.length === 0) configs = [{ label: "10 length alpha-numeric", detail: "   ex: 97H23jY62R", length: 10, type: "alphanumeric" }];
	alphabets.custom = vscode.workspace.getConfiguration("nanoid-gen").get("customAlphabet");

	let currentConfig = configs[0];

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('nanoid-gen.generateId', async () => {
		// The code you place here will be executed every time your command is executed
		// Run this everytime (even though it is run at start up).. It is fairly lightweight and should refresh any setting changes in real-time
		configs = vscode.workspace.getConfiguration("nanoid-gen").get("configurations");
		if (!configs || configs.length === 0) configs = [{ label: "10 length alpha-numeric", detail: "   ex: 97H23jY62R", length: 10, type: "alphanumeric" }];
		alphabets.custom = vscode.workspace.getConfiguration("nanoid-gen").get("customAlphabet");

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from UUID Generator!');
		let result = await vscode.window.showQuickPick(configs, { matchOnDetail: true });
		if (!result) return;
		else currentConfig = result;
		vscode.commands.executeCommand("nanoid-gen.insertId");

	});

	let insertCommand = vscode.commands.registerTextEditorCommand("nanoid-gen.insertId", (editor, edit) => {
		if (!currentConfig) currentConfig = { type: "alphanumeric", length: 10 };
		let idGen = nanoid.customAlphabet(alphabets[currentConfig.type]);
		editor.selections.forEach(selection => {
			edit.replace(selection, idGen(currentConfig.length));
		});
	});

	context.subscriptions.push(disposable, insertCommand);

}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
