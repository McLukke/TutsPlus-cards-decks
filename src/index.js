import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { fetchData } from './actions';
import * as reducers from './reducers';
reducers.routing = routerReducer;
import App from './components/app';
import VisibleCards from './components/visible-cards';
import NewCardModal from './components/new-card-modal';
import EditCardModal from './components/edit-card-modal';
import StudyModal from './components/study-modal';
import thunkMiddleware from 'redux-thunk';

const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));
const history = syncHistoryWithStore(browserHistory, store);

function run() {
	let state = store.getState();

	ReactDOM.render((
	<Provider store={store}>
		<Router history={history}>
			<Route path='/' component={App}>
				<Route path='/deck/:deckId' component={VisibleCards}>
					<Route path='/deck/:deckId/new' component={NewCardModal} />
					<Route path='/deck/:deckId/edit/:cardId' component={EditCardModal} />
					<Route path='/deck/:deckId/study' component={StudyModal} />
				</Route>
			</Route>
		</Router>
	</Provider>
	), document.querySelector('.container'));
}

// run();
// store.subscribe(run);

function save() {
	var state = store.getState();

	fetch('/api/data', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			decks: state.decks,
			cards: state.cards
		});
	});
}

function init() {
	run();
	store.subscribe(run);
	store.subscribe(save);
	store.dispatch(fetchData());
}
init();
