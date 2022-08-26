export default function Suggestion({$app, initialState}){
	this.state = initialState;
	this.$target = document.createElement('div');
	this.$target.className = 'Suggestion';

	this.render = () => {
			this.$target.innerHTML ='';
			const {keyword, suggestion} = this.state;
			if(suggestion.length > 0){
					$app.appendChild(this.$target)
					this.$target.innerHTML = `
					<ul>
							${suggestion.map((suggestion, index) => `<li${index === 0 ? ` class="Suggestion__item--selected">`:">"} ${suggestion.toLowerCase().replace(keyword.toLowerCase(), 
									`<span class="Suggestion__item--matched">${keyword}</span>`)}</li>`).join('')}
					</ul>`
			}
	}
	
	this.setState = (newState) => {
			this.state = newState;
			this.render();
	}

	this.$target.addEventListener('submit', e => {
		e.preventDefault();
			console.log('e');
	})

	window.addEventListener('keyup', e => {
			e.preventDefault();
			const $li = this.$target.querySelectorAll('li');
			const currentNode = this.$target.querySelector('.Suggestion__item--selected');

// 근데 내가봤을때 이것도 이렇게 이벤트로 조작하는거 아니고... 랜더링 해야되는건가?  sleected 이라면서?????
			if(e.key === "ArrowDown"){
					 $li.forEach((li, index) => {
							if(li === currentNode){
									li.classList.remove('Suggestion__item--selected')
									let currentindex = (index + 1) > $li.length-1 ? 0 : (index + 1);
									$li[currentindex].classList.add('Suggestion__item--selected')
							}
					})
			} else if(e.key === "ArrowUp"){
					$li.forEach((li, index) => {
							if(li === currentNode){
									li.classList.remove('Suggestion__item--selected')
									let currentindex = (index - 1) < 0 ? $li.length-1 : (index - 1);
									$li[currentindex].classList.add('Suggestion__item--selected')
							}
					})
			} else if(e.key === "Enter"){
									e.preventDefault();

			}
	})
} 