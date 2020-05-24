/*
    Most people have focused on Promises as an API. But this is the least interesting part.
    They are codification of pattern that lets us code in time independent way.

    Promises are to eliminate time as the concern, wrapped around a value. Its a futute value. At some point in time
    it will be exchanged into value. 
    
    They come from a language E programming language. There are called Futures. The same operations can be done on a future
    as on the value (even though the value is not there yet). Then it gets exchanged into value, once resolved

    Mechanism of a promise is basically a MONAD ( functional programming concept ).

    Control is inverted ( compared to a callback to utility ). In a promise we pass a completion event 
    and might pass an error. 
*/

function finish() {
	chargeCreditCard(purchaseInfo);
	showThankYouProfile();
}

function error(err) {
	logStatsError(err);
	finish();
}

var listener = trackCheckout(purchaseInfo);

listener.on('completion', finish);
listener.on('error', error);

/*
    Control is inverted. Rather than passing callback to track utility. We said give me an event listener. 
    And Ill take care of it.

    Promise is like event listener. Rather than being completion event, we call it then event.
*/

function trackCheckout(info) {
	return new Promise(function (resolve, reject) {
		// attempt to track checkout
		// if success call resolve, otherwise call reject
	});
}

// so we have instead

var promise = trackCheckout(purchaseInfo);

promise.then(finish, error);

/*
    But hey, If we still provide a promise a callback. Cant a promise resolve a callback several times?
    How can I trust a promise?

    Fundamental Principles of Promises:
    1. only resolved once
    2. either success or error
    3. messages passed/kept
    4. exceptions become errors
    5. Immutable once resolved

    Promise is a callback manager in a trustable fashion. Not about getting of nesting, there is a promise hell still.
    But retains trust to the transaction.

    Cancellable Promise does not make sense. Someone can cancell promise that I created?
*/
