import { BaseModel } from '../types';

export type Workout = BaseModel & {
  dateStart: string | null;
  dateEnd: string | null;
};

export type ListWorkoutData = {
  workout: {
    list: Workout[];
  }
}

type Input = {
  dateStart: string | null;
  dateEnd: string | null;
};

export type CreateWorkoutVars = {
  input: Input;
}
export type CreateWorkoutData = {
  workout: {
    create: Workout;
  }
}

export type EditWorkoutVars = {
  id: string;
  input: Input;
}
export type EditWorkoutData = {
  workout: {
    edit: Workout;
  }
}
