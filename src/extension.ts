import * as vscode from 'vscode';
import { isObject } from 'lodash';
// 变量内容缓存map
const VARIABLE_COLOR = require( './assets/scss-variable.json');

interface Color {
	[key: string]: string | Object;
}

export function activate(context: vscode.ExtensionContext) {

	const provideHover = (document: any, position: vscode.Position, token: Object) => {
		const word = document.getText(document.getWordRangeAtPosition(position));
		let v = '无替换的颜色变量  \n';
		if (/^#[0-9A-Za-z]{6}$/g.test(word)) {
			Object.keys(VARIABLE_COLOR).forEach((k: string) => {
				if (word === k) {
					v = '可替换的颜色变量:  \n';
					const o: Color = VARIABLE_COLOR[k];
					if (isObject(o)) {
						Object.keys(o).forEach((i: string) => {
							v += `* ${i}： ${word}\n`;
						});
					} else {
						v += `* ${o}： ${word}`;
					}
				}
			});
			return new vscode.Hover(v);
		}
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
