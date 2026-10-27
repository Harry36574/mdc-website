"""Run an explicit verification command and retain its real UTC times and output."""
import datetime, hashlib, json, pathlib, subprocess, sys
name, destination, *command = sys.argv[1:]
out = pathlib.Path(destination); out.mkdir(parents=True, exist_ok=True)
now = lambda: datetime.datetime.now(datetime.timezone.utc).isoformat().replace('+00:00', 'Z')
entry = {'name': name, 'command': command, 'workingDirectory': '.', 'startedAtUtc': now()}
result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
entry.update(finishedAtUtc=now(), exitCode=result.returncode, outputFile=name+'.log', outputSha256=hashlib.sha256(result.stdout).hexdigest())
(out/(name+'.log')).write_bytes(result.stdout)
with (out/'commands.jsonl').open('a') as stream: stream.write(json.dumps(entry)+'\n')
sys.stdout.buffer.write(result.stdout)
print(json.dumps(entry))
sys.exit(result.returncode)
