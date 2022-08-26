import {request} from "../api.js" 
import SearchInput from './SearchInput.js'
import Suggestion from './Suggestion.js'

const cache = {}

export default function App({$app}){

    this.state = {keyword: '', suggestion: []};



    const searchInput = new SearchInput({$app, 
        onInput: async (inputValue) => {
            if(!inputValue){
                this.setState({
                    keyword:'',
                    suggestion:[]
                })
                return;
            }
            console.log(inputValue)
            let nextSuggestion = null;
            if(cache[inputValue]) {
                nextSuggestion = cache[inputValue];
            } else {
                nextSuggestion = await request(`languages?keyword=${inputValue}`);
                cache[inputValue] = nextSuggestion
            }
            this.setState({
                keyword: inputValue,
                suggestion : nextSuggestion
            })
        }
    });

    const suggestion = new Suggestion({$app})

    this.setState = (newState) => {
        this.state = newState;
        suggestion.setState(this.state)

    }


} 