// Generator Fn - with multiple yields
function* testing(){
    console.log('code before first yield')
    yield 1;
    console.log('code before second yield')
    yield 2;
    console.log('code before third yield')
    yield 3;
}

// Generator Fn - with multiple yields
function* testing2(){
    console.log('Gen fn with loop')
    while(true){
        console.log('code before first yield')
        yield 1;
        console.log('code before second yield')
        yield 2;
        console.log('code before third yield')
        yield 3;
    }
}

export default function GenTest() {
    // calling the iterator from generator fn
    const iterator = testing();
    // next fn can be used to extract the value yielded by the generator
    // along with value we will also receive a done flag to indicate if generator has completed
    // will run all the code from iterator till first yield
    console.log(iterator.next()); // returns an object will value and done
    // will run all the code from iterator from first yield till second yield
    console.log(iterator.next()); // returns an object will value and done
    // will run all the code from iterator from second yield till third yield
    console.log(iterator.next()); // returns an object will value and done
    // will return value undefined and done true
    console.log(iterator.next()); // returns an object will value and done


    const iterator2 = testing2();
    console.log(iterator2.next());
    console.log(iterator2.next());
    console.log(iterator2.next());
    console.log(iterator2.next()); // will loop back to first yield

    return (
        <div>
            Gen Fn Test
        </div>
    )
}
