const TinySegmenter = require('tiny-segmenter');
const tinySegmenter = new TinySegmenter();

// const text = "イルシルとは？\n文章を打ち込むだけでスライド資料が完成\nデザインを考える時間がなくなり、\n効率的に資料を作成することが可能になります。\n外注と違い、社内の情報が外に漏れる心配もありません。";
const text = "アイコン自動挿入機能\n商標利用可能な素材が自動で入ります\n動画制作機能\n文章を打ち込むだけで、動画も作成できます\n豊富な出力機能\nPDF!,PPTX出力はもちろん、URL共有も可能です\n共同編集機能\nほかの方と同時に編集することも可能です。\n構成補助機能\n場面に応じた資料の構成をテンプレートで補助します\n丸投げプラン\n追加課金で文章の構成・内容まですべて弊社が対応致します";
const segments = tinySegmenter.segment(text);

const NumberOfCharactersOfLine = 6
var count = 0
var oneLine = ""
const Lines = []

function fromSegmentsReturnLines(segments,NumberOfCharactersOfLine){
    segments.forEach((segment,index) => {
        if (segment == "！" || segment =="？" || segment =="、" || segment =="。"){
            count += segment.length
            if (count > NumberOfCharactersOfLine){
                oneLine = oneLine.slice(0, -segments[index].length)
                Lines.push(oneLine)
                oneLine = segments[index-1] + segment
                count = oneLine.length
            }
            else{
                oneLine += segment
            }
        }
        else if (segment == "\n"){
            oneLine += segment
            Lines.push(oneLine)
            count = 0
            oneLine = ""
        }
        else{
            count += segment.length
            if (count > NumberOfCharactersOfLine){
                Lines.push(oneLine)
                count = 0
                oneLine = ""
                count += segment.length
                oneLine += segment
            }
            else{
                oneLine += segment
            }
        }
    })
    Lines.push(oneLine)
}

function isHankaku(value){
    return !value.match(/[^\x01-\x7E]/) || !value.match(/[^\uFF65-\uFF9F]/);
}

// fromSegmentsReturnLines(segments,NumberOfCharactersOfLine)

// console.log(segments)
// console.log(Lines);