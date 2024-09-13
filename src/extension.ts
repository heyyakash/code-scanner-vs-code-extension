import path from 'path';
import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "code-scanner" is now active!');
	const disposable = vscode.commands.registerCommand('code-scanner.scan',async () => {
		const files = await vscode.workspace.findFiles(`**/*.{java}`,"");
		files.forEach((file)=>{
			vscode.workspace.openTextDocument(file).then(doc => {
				sendDoc(doc);
			})
		})
	});

	context.subscriptions.push(disposable);
}

const sendDoc = async (doc: vscode.TextDocument) => {
	const text = doc.getText();
	console.log(text);
	const res = await fetch(`http://localhost:8000/analyze`,{
		method:"POST",
		headers:{
			"Content-Type": "application/json",
		},
		body:JSON.stringify({
			"code": text.toString()
		  })
	})
	const result = await res.json();
	const folders = vscode.workspace.workspaceFolders;
	if(folders){
		const root=  folders[0].uri.fsPath;
		const reportDirPath = path.join(root, 'report');
		if(!fs.existsSync(reportDirPath)){
			fs.mkdirSync(reportDirPath)
		}
		const filename = path.basename(doc.fileName);
		const reportFileName = `${filename}.report.json`;
		const reportFilePath = path.join(reportDirPath, reportFileName);

		fs.writeFileSync(reportFilePath, JSON.stringify(result, null,2));
		vscode.window.showInformationMessage(`Report created: ${reportFileName}`);
	}

}

// This method is called when your extension is deactivated
export function deactivate() {}
