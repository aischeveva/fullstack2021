type Stats = { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
};

/*
type InputArray = {
    target: number,
    days: Array<number>
};

const parseArgumentArray = (args: Array<string>): InputArray => {
    if (args.length < 4) throw new Error('Not enough arguments');
  
    if (!isNaN(Number(args[2]))) {
        let days: Array<number> = [];
        for(let i = 3; i < args.length; i++) {
            if(!isNaN(Number(args[i]))){
                days = days.concat(Number(args[i]));
            } else {
                throw new Error(`Value at index ${i} in the array is not a number`);
            }
        }
        return {
            target: Number(args[2]),
            days: days
        };
    } else {
        throw new Error('Provided target is not a number!');
    }
};
*/

export const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Stats => {
    const totalHours = dailyExerciseHours.reduce((s, e) => s+e);
    const average = totalHours/dailyExerciseHours.length;
    let rating = 0;
    let ratingDescription = '';
    if (target - average > 1) {
        rating = 1;
        ratingDescription = 'quite poor, you need to exercise more';
    } else if (target - average > 0) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 3;
        ratingDescription = 'excellent, keep up good work';
    }

    return {
        periodLength: dailyExerciseHours.length,
        trainingDays: dailyExerciseHours.filter(day => day > 0).length,
        success: totalHours === target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: totalHours/dailyExerciseHours.length
    };
};

/*
try {
    const { target, days } = parseArgumentArray(process.argv);
    console.log(calculateExercises(days, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
*/