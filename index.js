'use strict'

const root = document.getElementById('root');//Получение узла для передачи шахматной доски
const rowSize = 8;//число ячеек в строке и стольце шахматной доски

//Проверка на нахождение переданной координаты в пределах шахматной доски
const isInRange = (value) => {
	if(value > -1 && value < rowSize) return true;
	return false;
};

//Заливка ячеек шахматной фигуры определённым цветом, при помощи передачи css класса
function fillCell(choosen,variantsList,y,x){
	if(y == choosen[0] && x == choosen[1]) return "blue";//Закрашивание голубым цветом, если переданные координаты совападают с координатами нахождения фигуры
	for(let i = 0; i < variantsList.length; i++) {
		if(y == variantsList[i][0] && x == variantsList[i][1]) return "green";//Зелёный - совпадают координаты варианта хода фигуры
	}
	if(y%2 == x%2) return "white";//Белым, если остаток деления строки и столбца совападают 
	else return "black";//Чёрным, в ином случае
};

//Поиск вариантов хода фигуры с выбранной ячейки
function findMove(y,x) {
	const coord = [y,x];
	let variantsList = [];
	const first = 2;//Первый шаг фигуры на 2 клетки вперёд или назад
	const second = 1;//Второй шаг на 1 клетку влево или вправо
	for(let i = 0; i < 2; i++){//Смена координат. Фигура будет двигаться на 2 шага вперёд/назад по X и на 1 шаг вправо/влеао по Y, если i == 0 и на оборот если i == 1.
		for(let j = -1; j <= 1; j+=2){//Позволяет перемещать фигуру на 2 шага вперёд(1)/назад(-1)
			for(let k = -1; k <= 1; k+=2){//Позволяет перемещать фигуру на 1 шаг вправо(1)/влево(-1)
				//Умножение firstStep/secondStep на j/k позволяет менять направление хода фигуры
				if(isInRange(coord[i] + (first*j)) && isInRange(coord[+!i] + (second*k))) {
					let coord1 = coord[0] + (!i ? (first*j):(second*k));//Если первый шаг был по Y, то увеливаем/уменьшаем(опираясь на j) Y на 2, иначе увеличиваем/уменьшаем(опираясь на k) Y на 1
					let coord2 = coord[1] + (i ? (first*j):(second*k));//
					variantsList.push([coord1,coord2]);//Добавление варианта в список вариантов ходов
				}
			}
		}		
	}
	console.log(variantsList);
	printChessBoard(coord,variantsList);//Отрисовка шахматной доски с полученными изменениями
};

//Отрисовка шахматной доски
const printChessBoard = (choosen = [], variantsList = []) => {
	root.innerHTML = "";//Обнуление содержимого узла
	const tempFillCell = fillCell.bind(null,choosen,variantsList);//Каррирование координат фигуры и координат возможных ходов фигуры
	let chessBoard = "<table id=\"chess-board\">";	
	for(let i = 0; i < rowSize+1; i++){
		chessBoard += "<tr>";
		for(let j = 0; j < rowSize+1; j++){
			if(!j && !i) chessBoard += "<td class='chess-border'></td>";
			if(!i && j) chessBoard += "<td class='chess-border'>"+String.fromCharCode(65+j-1)+"</td>";//Отрисовка буквенных символов по горизонтали
			if(!j && i) chessBoard += "<td class='chess-border'>"+(8-i+1)+"</td>";//Отрисовка числовых символов по вертикали
			if(i && j) chessBoard += "<td class = "+tempFillCell(i-1,j-1)+" onClick=\"findMove("+(i-1)+","+(j-1)+")\"></td>";//Подбор цвета ячейки через tempFillCell и передача обработчика событий findMove для поиска возможных ходов 
		}
		chessBoard += "</tr>";
	}
	chessBoard += "</table>";
	root.innerHTML = chessBoard;//Передача шахматной доски
};

printChessBoard();//Запуск приложения