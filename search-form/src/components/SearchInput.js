export default function SearchInput({$app, onInput}){
	this.$target = document.createElement('form');
	this.$target.className = 'SearchInput';
	$app.appendChild(this.$target)
	// this.state = {};

	this.render = () => {
			this.$target.innerHTML = `<form class="SearchInput">
			<input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="">
		</form>`
	} 
	
	this.setState = (newState) => {
			this.state = newState;
	}

	this.render();

	this.$target.addEventListener('input', (e)=>{
			onInput(e.target.value);
	})
} 