from sqlalchemy.orm import Session
from app.db.models import Task
from app.schemas.task import TaskCreate, TaskUpdate

def get_tasks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Task).offset(skip).limit(limit).all()

def get_tasks_by_owner(db: Session, owner_id: int, skip: int = 0, limit: int = 100):
    return db.query(Task).filter(Task.owner_id == owner_id).offset(skip).limit(limit).all()

def create_task(db: Session, task: TaskCreate, owner_id: int):
    db_task = Task(**task.model_dump(), owner_id=owner_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_task(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()

def update_task(db: Session, task_id: int, task: TaskUpdate):
    db_task = get_task(db, task_id=task_id)
    if not db_task:
        return None
    for var, value in vars(task).items():
        setattr(db_task, var, value) if value is not None else None
    
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: int):
    db_task = get_task(db, task_id=task_id)
    if db_task:
        db.delete(db_task)
        db.commit()
    return db_task
