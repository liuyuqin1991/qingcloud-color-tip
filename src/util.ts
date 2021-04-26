import * as vscode from 'vscode';
import { readdirSync } from 'fs';
import { resolve } from 'path';

const getProjectPath = (document: any) => {
    if (!document) {
        document = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document : null;
    }
    if (!document) {
        return '';
    }
    const currentFile = (document.uri ? document.uri : document).fsPath;
    let projectPath = null;

    if (vscode.workspace.workspaceFolders) {
        let workspaceFolders: any = vscode.workspace.workspaceFolders.map(item => item.uri.path);
        // 由于存在Multi-root工作区，暂时没有特别好的判断方法，先这样粗暴判断
        // 如果发现只有一个根文件夹，读取其子文件夹作为 workspaceFolders
        if (workspaceFolders.length === 1 && workspaceFolders[0] === vscode.workspace.rootPath) {
            const rootPath = workspaceFolders[0];
            var files = readdirSync(rootPath);
            workspaceFolders = files.filter((name: any) => !/^\./g.test(name)).map((name: string) => resolve(rootPath, name));
            // vscode.workspace.rootPath会不准确，且已过时
            // return vscode.workspace.rootPath + '/' + this._getProjectName(vscode, document);
        }
        workspaceFolders.forEach((folder: any) => {
            if (currentFile.indexOf(folder) === 0) {
                projectPath = folder;
            }
        });
    }
    if (!projectPath) {
        return '';
    }
    return projectPath;
};

export { getProjectPath };