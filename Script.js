var FuncIsStart = false;
var MaxValue1, MaxValue2, maxTime = 10, signex, Tmt,
    sumRes, sumResTemp=0, FirstEntered= false, SesionIsStarted = false, TenStart=false, 
    WrongAnswers =0, SecCounter=0, countAnswers=0, tempString, countSessionsMath=0,
    valueRes; //RightAns=0, 
//--------------------------------------------------для калькулятора
function ChangeNumbers() {
    var rndmFirst, rndmSecond, str;
    
    var Chng = function() {
        //console.log(MaxValue1+"change value"+MaxValue2);
        do {rndmFirst = Math.floor(Math.random() * MaxValue1);  }while(rndmFirst<1)
        do {rndmSecond = Math.floor(Math.random() * MaxValue2); }while(rndmSecond<1)
    }; Chng();
    
    if(signex == '+'){ //                               -----Если выбран "+"
        str = rndmFirst+"+"+rndmSecond+"=";
        while(tempString===str){                         //если следующий пример одинаковый
            Chng(); str = rndmFirst+"+"+rndmSecond+"=";} //если следующий пример одинаковый
        sumRes = (rndmFirst+rndmSecond);
        document.getElementById('res').value = str;
   } else if(signex == '-') {  //            -------------------------Если выбран "-"
        while(rndmFirst<rndmSecond) { Chng();   }
        str = rndmFirst+"-"+rndmSecond+"="
        while(tempString===str){ 
           Chng();
           while(rndmFirst<rndmSecond) { Chng();   }
           str = rndmFirst+"-"+rndmSecond+"=";
        } //end while 
        sumRes = (rndmFirst-rndmSecond);
       document.getElementById('res').value = str;
    } else if(signex == 'b') {          //-----------------------------если рабиобн == -+
        var signCh = Math.floor(Math.random() * 10);
        if(signCh < 5) {
            str = rndmFirst+"+"+rndmSecond+"=";
            while(tempString===str){                     //если следующий пример одинаковый
            Chng(); str = rndmFirst+"+"+rndmSecond+"=";} //если следующий пример одинаковый
            sumRes = (rndmFirst+rndmSecond);
            document.getElementById('res').value = str;
        }else if(signCh >= 5){
            while(rndmFirst<rndmSecond) { Chng(); }
            str = rndmFirst+"-"+rndmSecond+"=";
            while(tempString===str){                    //если следующий пример одинаковый
               Chng();                                  //если следующий пример одинаковый
               while(rndmFirst<rndmSecond) { Chng();   }//если следующий пример одинаковый
               str = rndmFirst+"-"+rndmSecond+"=";      //если следующий пример одинаковый
             }  //end while  
            sumRes = (rndmFirst-rndmSecond);
            document.getElementById('res').value = str;
        }
    }else if(signex == 'ten') {     //---------------------если рабиобн == 10
        do {rndmFirst = Math.floor(Math.random() * 10);  }while(rndmFirst<1)
        str = rndmFirst+"+?"+"=10";
        while(tempString===str){                         //если следующий пример одинаковый
            Chng(); str = rndmFirst+"+?"+"=10";} //если следующий пример одинаковый
        sumRes = (10-rndmFirst);
        document.getElementById('res').value = str;
    }
    tempString = str; // tempString для того чтобы не повторялись примеры
}
function BtnClickStart() {
    StartSession();
}
function StartSession() {
    var s,
    sumResTemp=0;
    if(!SesionIsStarted) {
        SesionIsStarted = true;
        var Btn = document.getElementById('BtnStart');
        Btn.innerHTML = "Стоп ";
        Btn.style.backgroundColor = 'Blue';
        CheckSign();
        secCounter = setInterval(TimeTick, 1000);
        
    } else {
        EndSession();
    } //end if else
} // end StartSession()

function CheckSign() {  // При нажатии старт проверяет настройки
    // проверк  настроек времени и макс числа
    if(document.getElementById('TimeEx').value === '30'){ maxTime = 30; }
    if(document.getElementById('TimeEx').value === '60'){ maxTime = 60; }
    if(document.getElementById('TimeEx').value === '--'){ maxTime = 99990; }
    // проверк  настроек maxValue1
    if(document.getElementById('MaxValue1').value === '10'){ MaxValue1 = 10; }
    if(document.getElementById('MaxValue1').value === '20'){ MaxValue1 = 20; }
    if(document.getElementById('MaxValue1').value === '30'){ MaxValue1 = 30; }
    if(document.getElementById('MaxValue1').value === '50'){ MaxValue1 = 50; }
    if(document.getElementById('MaxValue1').value === '5'){ MaxValue1 = 5; }
    // проверк  настроек maxValue2
    if(document.getElementById('MaxValue2').value === '10'){ MaxValue2 = 10; }
    if(document.getElementById('MaxValue2').value === '20'){ MaxValue2 = 20; }
    if(document.getElementById('MaxValue2').value === '30'){ MaxValue2 = 30; }
    if(document.getElementById('MaxValue2').value === '50'){ MaxValue2 = 50; }
    if(document.getElementById('MaxValue2').value === '5'){ MaxValue2 = 5; }
    if(document.getElementById('MaxValue2').value === '10'){ MaxValue2 = 10; }
    if(document.getElementById('MaxValue2').value === '20'){ MaxValue2 = 20; }
    if(document.getElementById('MaxValue2').value === '30'){ MaxValue2 = 30; }
    if(document.getElementById('MaxValue2').value === '50'){ MaxValue2 = 50; }
    if(document.getElementById('MaxValue2').value === '5'){ MaxValue2 = 5; }
    // проверк  настроек Sign
       if( document.getElementById('SPlus').checked) {
           signex = '+'; ChangeNumbers();
       } else if(document.getElementById('SMinus').checked) {
           signex = '-'; ChangeNumbers();
       }else if(document.getElementById('SPlMin').checked) {
           signex = 'b'; ChangeNumbers();
       } else if(document.getElementById('Ten').checked){
           signex = 'ten'; TenStart=true; ChangeNumbers();
       }else { alert('не попал ни в один случай передачи знаков');}
    }   // End CheckSign()

function EndSession() {
    var Btn = document.getElementById('BtnStart');
    Btn.innerHTML = "Старт ";
    Btn.style.backgroundColor = 'aqua';
    document.getElementById('res').value = ' - - - -'; 
    clearInterval(secCounter);
    if(Tmt){clearTimeout(Tmt); }
    countSessionsMath++;
    document.getElementById('RightAnswers').innerHTML = '0';
    document.getElementById('WrongAnswers').innerHTML = '0';
    document.getElementById('SecondsLeftCalc').innerHTML = '0';
    stdiv = document.getElementById('StatisticDiv');
    stdiv.innerHTML = countSessionsMath+".Вірно-"+countAnswers+",Невірно-"+WrongAnswers+" |"+SecCounter+"сек"+signex+"<br>"+stdiv.innerHTML;
    if(countSessionsMath === 3) { document.getElementById('StatisticDiv').style.backgroundColor = 'green'; }
    if(countSessionsMath >= 5) { document.getElementById('smileDivMath').style.visibility='visible'; }
    alert("Ты набрав - "+ Math.floor((countAnswers*2 /(SecCounter+WrongAnswers)*100)-(WrongAnswers*5))+" балів\n відповідей - "+countAnswers+"\n неправельных - "+WrongAnswers+"\n секунд - "+SecCounter);
    SesionIsStarted = false;
    TenStart = false;
    countAnswers = 0;
    WrongAnswers = 0;
    tempString = "";
    sumResTemp = 0;
    SecCounter = 0;
    
}

function CheckAnswer(arg) {
    if(SesionIsStarted === false) return;
//    if(TenStart) {
//        if(arg === ){//TenExersice();
//        return;}
    if(sumRes<10 && FirstEntered!=true) {     //Если меньше 10
            if(arg == sumRes) {                // ++== Правельный ответ <10 ==++
                countAnswers++;
                document.getElementById('RightAnswers').innerHTML = countAnswers;
                if(TenStart===true) document.getElementById('res').value=(10-sumRes)+'+'+sumRes+'=10';
                else document.getElementById('res').value+= arg; 
                document.getElementById('res').style.backgroundColor = 'chartreuse';
                Tmt = setTimeout(AnimationChge, 400);
            }else {                             // --==Неправельный ответ ==--
                 WrongAnswers++;
                 document.getElementById('res').style.backgroundColor = 'red';
                 document.getElementById('WrongAnswers').innerHTML = WrongAnswers;
                 Tmt = setTimeout(AnimWrAnsw1, 300);
                 function AnimWrAnsw1() {
                    document.getElementById('res').style.backgroundColor = "white";
                    ClearAnswer();
                 }
            }
    } else {                                // Число больше 10
            if(!FirstEntered) {             //1е число
                FirstEntered = true;
                document.getElementById('res').value+= arg;
                sumResTemp = (arg*10);
            } else {                        // 2е число 
                sumResTemp = (sumResTemp + parseInt(arg, 10));  //Плюсуем 1е введенное и 2е число
                
                if(sumResTemp == sumRes) {          // ++== Правельный ответ >10 ==++
                    countAnswers++;
                    document.getElementById('RightAnswers').innerHTML = countAnswers;
                    document.getElementById('res').style.backgroundColor = 'chartreuse';
                    document.getElementById('res').value+=arg;
                    sumResTemp = 0;
                    FirstEntered = false;
                   
                    Tmt = setTimeout(AnimationChge, 400);
                } else {                    // Неправельный ответ
                    WrongAnswers++;
                    var animRes = document.getElementById('res').style.backgroundColor = 'red';
                    document.getElementById('WrongAnswers').innerHTML = WrongAnswers;
                    
                    Tmt = setTimeout(AnimWrAnsw, 300);
                    function AnimWrAnsw() {
                        document.getElementById('res').style.backgroundColor = "white";
                        ClearAnswer();
                    } //end function AnimWrAnsw()
                } //end else
            }
     }

}
function ClearAnswer() {
    if(SesionIsStarted === false) return;
    if(tempString != undefined){
       document.getElementById('res').value = tempString;
       FirstEntered= false;
       sumResTemp=0;
   }else {
        document.getElementById('res').value = '<--';
   }
}
function AnimationChge() {
    document.getElementById('res').style.backgroundColor = 'white';
    ChangeNumbers();
}
function TimeTick() {
    if(SecCounter<maxTime) {
        SecCounter++;
        document.getElementById('SecondsLeftCalc').innerHTML = SecCounter;
    }else { 
        EndSession();
    }
} 

//--------------------------------------------------для Читайлика
var tmLength, tmTick=0, timeMude=false, accelMude=false, sessionIsStarted=false;
var tmpRdm = -1, cntAnswers=0, countSessions=0, arrWords, tmchg=2000; 
var arrWords3= ["про", "ско", "опр", "кру", "три", "укр", "xто", "той", "цей", "как", "она", "опр", "так", "щеп", "для", "вже", "кто", "вот", "ніч", "мій", "під", "жду", "сам", "раз", "два", "чем", "там", "тут", "при", "без", "дом", "ваш", "над", "три", "час", "мир", "від", "ряд", "про", "пол", "бог", "ліс", "син", "оно", "оба", "шаг", "ухо", "муж", "нос", "сон", "зуб", "вік", "ход", "зал", "дух", "сто", "род", "шия", "вон", "чай", "суд", "чий", "дід", "лоб", "бок", "сад", "дим", "рот", "шум", "дно", "їжа", "меч", "кот", "фон", "ехо", "зря", "тон", "дон", "обо", "лід", "газ", "пес", "луч", "жар", "пот", "біг", "шеф", "яма", "шар", "лев", "лук", "дар", "меж", "док", "вні", "мак", "цех", "суп", "акт", "люк", "зад", "рог", "жир", "рай", "сок", "ген", "раб", "ток", "рис", "гад", "маг", "хор", "гул", "бик", "луг", "дуб", "сук", "кол", "бак", "поп", "ось", "рим", "том", "вал", "око", "ура", "мед", "пан", "хан", "мат", "бас", "рок", "юго", "жук", "чех", "шах", "шок", "вуз", "боб", "зам", "мох", "лак", "кий", "бах", "таз", "ера", "шов", "пух", "кит", "бал", "пал", "куб", "бар", "низ", "ров", "мах", "екс", "ком", "рак", "юла", "воз", "лом", "шут", "йод", "уют", "чум", "бор", "орт", "пуд", "кон", "кап", "тюк", "оса", "хам", "тук", "зов", "код", "рой", "мул", "топ", "нюх", "іск", "пас", "чет", "шиш", "туз", "паж", "дот", "ода", "вар", "бум", "чан", "чек", "шип", "йог", "аул", "бон", "чуб", "унт", "лис", "шик", "бот", "кок", "туш", "бур", "зуд", "лог", "фут", "лаз", "гам", "чіп", "пек", "сор", "тол", "кед", "сям", "кум", "лот", "пуп", "вол", "душ", "чур", "уха", "под", "вяз", "пай", "бац", "паз", "дол", "чад", "бом", "циц", "ака", "цап", "пат", "узи", "еха", "тор", "чиж", "гоп", "ату", "аут", "вах", "лад", "ужо", "бук", "опт", "паб", "хоп", "бра", "рож", "пра", "аби", "пар", "хек", "ква", "джи", "соя", "фат", "пли", "ляп", "той", "баш", "гик", "цок", "туя", "чих", "гот", "ярд", "мот", "кош", "юрт", "ямб", "тяж", "мая", "сом", "мяу"];
var arrWords4 = ["прок", "скол", "стіл", "крут", "море", "нога", "муха", "море", "цирк", "байт", "вежа", "вода", "грам", "день", "диво", "друг", "зима", "туба", "мета", "пазл", "ріпа", "рука", "село", "сіль", "удар", "файл", "юнга", "тихо", "мати", "кінь", "сало", "шарф", "абат", "адам", "азот", "банк", "амур", "анод", "арка", "атом", "баба", "база", "баня", "барс", "баян", "біля", "бинт", "блеф", "блок", "блюз", "брат", "бруд", "була", "буси", "вага", "ваза", "вата", "вежа", "віза", "вила", "вино", "вінт", "віра", "вірш", "вовк", "вода", "воїн", "воля", "вона", "вони", "вуха", "гімн", "гиря", "глиб", "гнів", "гном", "гора", "град", "грам", "гуаш", "гурт", "гуща", "дама", "дані", "дата", "двір", "джаз", "джем", "джип", "диво", "диня", "діод", "діра", "диск", "діти", "друг", "дріт", "дуло", "дюйм", "душа", "едем", "ельф", "єгор", "етил", "етюд", "ефір", "єнот", "жаба", "жало", "жарт", "желе", "жмут", "жижа", "збір", "збут", "звіт", "звук", "зима", "зліт", "знак", "зубр", "ікра", "іран", "ірис", "їжак", "йога", "кава", "кафе", "каша", "квас", "кеди", "кекс", "кіно", "киця", "клей", "кола", "куля", "краб", "лапа", "літо", "ліфт", "лорд", "лось", "луна", "люкс", "мама", "меню", "метр", "мило", "міст", "мова", "миша", "муха", "м'ясо", "м'ята", "небо", "неон", "нота", "обід", "нора", "один", "одяг", "олія", "онук", "опис", "приз", "птах", "плащ", "плющ", "пляж", "поет", "полк", "поет", "прес", "пупс", "пюре", "рама", "рейс", "риба", "ромб", "руль", "сало", "сила", "слон", "сніг", "сова", "соня", "тато", "темп", "тест", "титр", "торт", "удар", "узор", "унти", "упор", "урок", "уряд", "утюг", "уява", "фаза", "факт", "флот", "фонд", "фото", "хата", "хвоя", "хист", "хліб", "хлюп", "храп", "хрящ", "цвіт", "цикл", "ціна", "чаша", "цирк", "чілі", "чудо", "шанс", "шарф", "шило", "шнур", "штат", "шуба", "щиро", "шуба", "щока", "щеня", "щука", "юбка", "юнга", "юнак", "явір", "ядро", "язик", "яйце", "якби", "якби", "ясен", "ясла", "борщ", "овощ", "плащ", "плющ", "хвощ", "хрущ", "хрящ"];
var arrWords5 = ["азарт","айова", "актив", "актор", "акула", "акція", "алича", "альфа", "армія", "аркуш", "аудит", "багаж", "багет", "банан", "балон", "бігун", "бізон", "білка", "битва", "бичок", "блиск", "блюдо", "боєць", "броня", "бугай", "буква", "булка", "буфет", "варта", "вафля", "весло", "весна", "велич", "відро", "вираз", "вірші", "вісім", "водій", "возик", "вольт", "вплив", "гайка", "ганна", "ґедзь", "гелій", "геній", "герой", "гонка", "горіх", "город", "декан", "декор", "дерун", "дефіс", "дзвін", "дієта", "драйв", "дрова", "еліпс", "епоха", "епюра", "естет", "етика", "завод", "заєць", "закон", "заряд", "заява", "земля", "зірка", "зміна", "зріст", "імбир", "іспит", "казка", "капот", "квант", "квота", "килим", "коник", "копія", "кошти", "краса", "кулон", "лаваш", "лампа ", "ласун", "лідер", "ліжко", "ліміт", "лимон", "ложка", "лопух", "мажор", "марка", "масло", "метал", "мінус", "мопед", "моряк", "мотор", "нагин", "надія", "намет", "намір", "нація", "носик", "обсяг", "овочі", "одежа", "олімп", "опора", "пакет", "папка", "пегас", "пілот", "плече", "площа", "подія", "політ", "помпа", "порох", "посол", "птиця", "пункт", "пушок", "радар", "пошта", "право", "праця", "район", "раунд", "річка", "румба", "самбо", "саміт", "свінг", "скала", "скарб", "слава", "слово", "сонце", "стеля", "сумка", "сюжет", "таксі", "татко", "тембр", "томат", "траст", "тропа", "туфлі", "фасад", "ферма", "фільм", "фірма", "флінт", "хвиля", "хвіст", "хімія", "хокей", "хруст", "хутро", "цукор", "цуцик", "чайка", "чапля", "читка", "човен", "чуття", "шинка", "шишка", "шкала", "шапка", "шолом", "шабля", "щастя", "щітка", "щогла", "шорти", "щучка", "юніор", "юрист", "явище", "ягуар", "яєчко", "яєшня", "ялина", "янгол", "янтар", "ярлик", "ясена"];

function ButtonClickRead(button) {
   if(!sessionIsStarted) {
	   var chamo = document.getElementById('ChAmount').value;
		  
          if(chamo == 3){
              arrWords = arrWords3;
          }else if(chamo == 4){
              arrWords = arrWords4;
          }else if(chamo == 5){
              arrWords = arrWords5;
          }
	   
      if(document.getElementById('PerMin').checked) {
          
          sessionIsStarted=true;
          timeMude=true;
          tmLength = document.getElementById('TimeExRead').value;
          
          document.getElementById('BtnStop').style.visibility = 'visible';
          startReadSession();
      } else if(document.getElementById('quickens').checked) {
          document.getElementById('BtnStop').style.visibility = 'visible';
          document.getElementById('btnRead').style.visibility = 'hidden';
          tmLength = document.getElementById('TimeExRead').value;
          accelMude = true;
         
      }
   }
    if(timeMude){
        CreateRandomWord();
        
        document.getElementById("Readed").innerHTML=cntAnswers;
        cntAnswers++;
    } else if(accelMude && sessionIsStarted===false) { sessionIsStarted=true; startAccelMudeSession();}
}
function startReadSession() {
    document.getElementById('SecondsLeftRead').innerHTML=tmTick;
   // tmTick++;
    if(tmTick<tmLength){
        tmrRead = setTimeout('tmTick++;startReadSession();', 1000);
    } else {stopSession();}
}
function CreateRandomWord() {
    var rndm;
    do {
       rndm = Math.floor(Math.random() * arrWords.length);
       if (tmpRdm === rndm) { continue; }
       else {
             document.getElementById('resultRead').innerHTML = arrWords[rndm];
             tmpRdm = rndm;
       } break;
    } while (true);
}
function startAccelMudeSession() { 
    if(tmchg > 900) {
        
        CreateRandomWord();
        tmchg = tmchg>1500 ? tmchg - 30: tmchg - 10;
        cntAnswers++;
        document.getElementById("Readed").innerHTML=cntAnswers;
        tmrRead = setTimeout(startAccelMudeSession, tmchg);

            } else {
                
                stopSession();
            }//else

}
function stopSession() {
    clearTimeout(tmrRead);
    sessionIsStarted=false;
    var r = timeMude ?  "р1" : accelMude ? "р2" : "р3";
    
    
    document.getElementById("Readed").innerHTML='0';
    document.getElementById('SecondsLeftRead').innerHTML='0';
    document.getElementById('resultRead').innerHTML = '- - -';
    countSessions++;
    if(countSessions===3) document.getElementById('StatDivRead').style.backgroundColor = 'green';
    if(countSessions>=5) document.getElementById('smileDiv').style.visibility='visible';
    if(timeMude){
        document.getElementById('StatDivRead').innerHTML+=countSessions+'. Відп:'+cntAnswers+', Час:'+tmTick+' '+r+'<br>';
        alert('Відповідей: '+(cntAnswers-1)+'\nШвидкість читання: '+Math.floor(cntAnswers*60/tmTick)+' за хвилину');
        } else if(accelMude) {
            document.getElementById('StatDivRead').innerHTML+=countSessions+'. Відп:'+cntAnswers+', Швд:'+tmchg/1000+' '+'<br>'; document.getElementById('btnRead').style.visibility = 'visible';
        alert('Відповідей: '+(cntAnswers-1)+'\nШвидкість зміни слогів: '+tmchg/1000+' за хвилину');
        }
    tmTick=0;
    cntAnswers=0;
    tmchg=2000;
    timeMude=false;
    accelMude=false;
    document.getElementById('BtnStop').style.visibility = 'hidden';
}