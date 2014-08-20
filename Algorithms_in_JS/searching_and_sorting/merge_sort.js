// marina wahl
// summer/2014



function mergeSort(seq)
{
    if (seq.length < 2)
        return seq;

    var middle = parseInt(seq.length / 2);
    var left   = seq.slice(0, middle);
    var right  = seq.slice(middle, seq.length);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}


seq = [1,2,5,6,7,10,12,12,14,15]
console.log(mergeSort(seq))