<script src="https://cdn.jsdelivr.net/npm/heic2any"></script>

        document.getElementById('convertButton').addEventListener('click', function () {
            const fileInput = document.getElementById('fileInput');
            const formatSelect = document.getElementById('formatSelect');
            const outputDiv = document.getElementById('output');

            if (fileInput.files.length === 0) {
                alert('Por favor, selecione um arquivo HEIF para converter.');
                return;
            }

            const file = fileInput.files[0];
            const outputFormat = formatSelect.value;

            heic2any({
                blob: file,
                toType: outputFormat,
            }).then(function (resultBlob) {
                const url = URL.createObjectURL(resultBlob);
                const img = document.createElement('img');
                img.src = url;
                outputDiv.innerHTML = '';  // Limpa a saída anterior
                outputDiv.appendChild(img);

                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = `converted.${outputFormat.split('/')[1]}`;
                downloadLink.innerText = 'Baixar Imagem Convertida';
                downloadLink.style.display = 'block';
                downloadLink.style.marginTop = '10px';
                outputDiv.appendChild(downloadLink);
            }).catch(function (error) {
                console.error('Erro na conversão:', error);
                alert('Houve um erro ao converter o arquivo. Por favor, tente novamente.');
            });
        });
