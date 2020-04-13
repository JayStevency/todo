import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Timestamp, OneToMany } from "typeorm";

@Entity({
  name: 'todos'
})
export class Todo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  due: Date;

  @Column({
    name: 'is_checked'
  })
  isChecked: boolean;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;

  @ManyToOne(type => Todo, todo=> todo.children)
  parent: Todo;

  @OneToMany(type => Todo, todo => todo.parent)
  children: Todo[];
}