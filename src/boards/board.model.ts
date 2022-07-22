// interface - 변수의 타입만 체크
// classes - 변수의 타입도 체크하고 인스터스 또한 생성 가능

export interface Board {
    id: string,
    title: string,
    description: string,
    status: BoardStatus
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}