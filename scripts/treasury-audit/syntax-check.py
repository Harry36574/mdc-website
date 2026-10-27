import ast,json,pathlib,subprocess
root=pathlib.Path(__file__).resolve().parents[2]
checked=[]
for base in ['transparency','scripts/treasury-audit','test/treasury-audit']:
    for p in sorted((root/base).rglob('*')):
        if p.suffix=='.mjs':
            result=subprocess.run(['node','--check',str(p)],capture_output=True,text=True)
            assert result.returncode==0,str(p.relative_to(root))+'\n'+result.stdout+result.stderr
            checked.append({'file':str(p.relative_to(root)),'check':'node --check','status':'PASS'})
        elif p.suffix=='.py':
            ast.parse(p.read_text(),filename=str(p.relative_to(root)))
            checked.append({'file':str(p.relative_to(root)),'check':'Python AST parse','status':'PASS'})
print(json.dumps({'scope':'Website/tooling syntax only; not Solidity static analysis','checked':checked},indent=2))
