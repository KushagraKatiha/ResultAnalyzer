const { spawn } = require('child_process');

exports.analyzeFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', ['./analyze.py', filePath]);

    let stdoutData = '';
    let stderrData = '';

    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString('utf8');
    });

    pythonProcess.stderr.on('data', (data) => {
      stderrData += data.toString('utf8');
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Python script process exited with code ${code}`);
        console.error('Python script STDERR:', stderrData);
        reject(stderrData);
      } else {
        console.log('stdoutData:', stdoutData);
        try {
          const trimmedOutput = stdoutData.trim();
          const result = JSON.parse(trimmedOutput);
          console.log('Analysis result:', result);
          resolve(result);
        } catch (parseError) {
          console.error('Error parsing analysis result:', parseError);
          reject(parseError);
        }
      }
    });

    pythonProcess.on('error', (err) => {
      console.error('Failed to start Python process.', err);
      reject(err);
    });
  });
};