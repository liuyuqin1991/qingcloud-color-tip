import * as vscode from 'vscode';
import { getColorName } from './util';

export function activate(context: vscode.ExtensionContext) {

	const provideHover = (document: any, position: vscode.Position, token: Object) => {
		const word = document.getText(document.getWordRangeAtPosition(position));
		return new vscode.Hover(getColorName(word));
	};

	const provider = vscode.languages.registerHoverProvider(
		['scss', 'stylus'],
		{
			provideHover,
		},
	);
	console.log("恭喜，青云前端项目颜色变量提示插件已被激活！");
	context.subscriptions.push(provider);
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log("恭喜，青云前端项目颜色变量提示插件已被销毁！");
}
