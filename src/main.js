/*global elements*/
let blockTable = document.getElementById('block-table');
let tumbler = document.querySelector('.show-table');

/*изменяет вид с блочного на таьличный и обратно*/
function showTable(){
	let tumblerFlag = true;
	tumbler.addEventListener('mouseover', ()=>{
		let add = null, 
			remove = null;
		if(tumblerFlag){
			add = 'table',
			remove = 'grid';
		}
		else{
			add = 'grid',
			remove = 'table';
		}
		blockTable.classList.add(add);
		blockTable.classList.remove(remove);
		tumblerFlag = !tumblerFlag;
	});
	
};

/*рендерит список с продустами*/
function showProducts(data, element){
	console.log(data)
	element.innerHTML = ""
	for(let elem of data){
		let product = `<div class="grid__product product" data-id="${elem.id}" draggable="true">
   					<div class="product__img">
   						<img src=${elem.img} alt="productName">
   					</div>
   					<div class="product__text">
   					  <h5 class="product__name" data-id=${elem.id}>${elem.name}</h5>
   					  <p class="product__desc">${elem.description}</p>
   					  </div>
   					<span class="product__price">
   						${elem.price}
   					</span>
   					<button class="product__buy">buy</button>
   				</div>`;
		element.innerHTML += product 
	}
	changeName();
}
/*вункция изменения имени*/
function changeName(){
	let names = document.querySelectorAll('.product__name');
	names.forEach(elem=>{
		elem.addEventListener('click', createInput)
	});
}
/*cоздает и выводит элемент инпут*/
function createInput(){
	let text = this.innerText;
	let id = this.dataset.id;
	this.innerText = '';
	this.removeEventListener('click', createInput)
	
	let input= document.createElement('input');
	input.setAttribute('value', text);
	input.addEventListener('blur', ()=>{
		setNewName(input, id);
		
		/*запись изменеий имени в лосальное хранилище*/
		let data = JSON.stringify(products)
		localStorage.setItem('test', data)
		
		showProducts(products, blockTable);
		this.addEventListener('click', createInput);
	})
	this.appendChild(input)
	input.focus();
}
/*записывает новое имя в иассив данных products*/
function setNewName(input, id){
	for(let elem of products){
		if(elem.id == id){
			elem.name = input.value;
			break;
		}
	}
}

/*перетаскивание элемента*/

function dragDrop(){
	let cards = document.querySelectorAll('.product');
	let thisElem = null;
	let thisElem2 = null;
	
	cards.forEach(function(elem){
		elem.addEventListener('dragstart', function(e){
			thisElem = this;
		})
		elem.addEventListener('dragenter', function(e){
			thisElem2 = this;
		})
		elem.addEventListener('dragend', function(e){
			parrentElem = this.parentElement
			parrentElem.insertBefore(thisElem, thisElem2)
		})
	})
}

if(localStorage.getItem('test')){
	products = JSON.parse(localStorage.getItem('test'))	
};

showProducts(products, blockTable)
showTable()

dragDrop();


















/*валидация скобок*/

/*создает рандомный текст со скобками*/
function randomString(num){
	let list1 = ["()", "[]", '{}'];
	let list2 = ["(", "[", '{'];
	let list3 = [")", "]", '}'];
	let res = [];
	for(let i=0; i< num; i++){
		let listRandom = getRandomInt(0, list1.length),
			addRamdom = Math.round(Math.random())
		if(addRamdom){
			res.push(list1[listRandom]);
		}
		else{
			res.unshift(list2[listRandom]);
			res.push(list3[listRandom])
		}
	}
	return res.join('');
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}


/*проверяет на валидацию*/
function validate(str){
	arrString = str.split('');
	
	let list = ["()", "[]", '{}'],
		i = true;
	
	while(i){
		k = 0;
		for(let key of list){
			
			let j = true;
			
			while(j){
				
				let index = str.indexOf(key)
				if(index+1){
					arrString.splice(index, 2);
					str = arrString.join('');
					k++;
				}
				else{
					j = !j;	
				};
			};
		};
		i = k;
	};
	
	!str 
		? console.log('скобки правильно вложены')
		: console.log('скобки не правильно вложены');
	
	console.log(!Boolean(str));
}

console.log(randomString(6))

validate(randomString(6))











