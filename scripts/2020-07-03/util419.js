const NTRIALS = 100;

function runExpt() {

  let statsdiv = select("#stats");
  let cselect = select("#controller");
  
  // print header
  statsdiv.html('     controller | mean +- err\n');
  statsdiv.html('----------------+---------------\n', true);
  
  // loop over controllers
  for (let i = 0; i < controllerNames.length; i++) {
    let cname = controllerNames[i];
    cselect.value(cname);
    statsdiv.html(sprintf("%15s |", cname), true);
    
    // run trials
    let data = [];
    for (let itrial = 0; itrial < NTRIALS; itrial++) {
    simReset();
    for (let i=0; i<NSTEPS; i++) simStep();
      data.push(bot.energy)
    }
    
    
    // calculate and print statistics
    let stats = calcArrayStats(data);
    statsdiv.html(sprintf(" %3.1f +- %3.1f\n", stats.mean, stats.sem), true);
  }
}
  

function calcArrayStats(inputArray) {
  //
  // calculates mean, standard deviation and standar error of Array elements 
  //
  // input: inputArray, an array of numbers
  // returns: {mean: <mean>, std: <standard deviation>, sem: <standard error>}
  //
  let sum = 0;
  let sumSq = 0;
  let n = inputArray.length;
  for (let i = 0; i < n; i++) {
    sum += inputArray[i];
    sumSq += inputArray[i] * inputArray[i];
  }
  let variance = (sumSq - (sum * sum) / n) / (n - 1);
  return {
    mean: sum / n,
    std: Math.sqrt(variance),
    sem: Math.sqrt(variance / n)
  };
}