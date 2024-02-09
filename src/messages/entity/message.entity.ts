import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;
    
    @Column()
    username:string;

    @Column()
    userId:string;

    @Column()
    conversationId:string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt:Date;
    
}