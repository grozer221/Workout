import { gql } from '@apollo/client';

export const workoutFragment = gql`
fragment WorkoutFragment on WorkoutType {
  id
  dateStart
  dateEnd
  createdAt
  updatedAt
}
`

export const listWorkout = gql`
query {
  workout {
    list {
      ...WorkoutFragment
    }
  }
}
${workoutFragment}
`

export const createWorkout = gql`
mutation ($input: WorkoutInputType!) {
  workout {
    create(input: $input) {
      ...WorkoutFragment
    }
  }
}
${workoutFragment}
`

export const editWorkout = gql`
mutation ($id: Guid!, $input: WorkoutInputType!) {
  workout {
    edit(id: $id, input: $input) {
      ...WorkoutFragment
    }
  }
}
${workoutFragment}
`
