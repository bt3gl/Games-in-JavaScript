// marina wahl
// summer/2014



function binarySearch(seq, key){

    var lo       = 0,
        hi       = seq.length - 1,
        mid      = Math.floor((hi + lo)/2);

    while(lo < hi){

        if (key < seq[mid]){
            hi = mid - 1;
        } else if (key > seq[mid]){
            lo = mid + 1;
        }

        mid = Math.floor((hi + lo)/2);
    }

    return (seq[mid] != key) ? -1 : mid;
}


seq = [1,2,5,6,7,10,12,12,14,15]
key = 6
console.log(binarySearch(seq, key))