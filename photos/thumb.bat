@set ASEPRITE="C:\Program Files (x86)\Steam\steamapps\common\Aseprite\Aseprite.exe"
for %%f in (photosLarge\*) do (
    %ASEPRITE% -b --oneframe %%f --scale 0.1 --save-as photosSmall\%%~nf.JPG
    echo "%%~nf.JPG", >> fileList.txt
)