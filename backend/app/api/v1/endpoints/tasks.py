from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.task import TaskCreate, TaskUpdate, TaskOut
from app.crud import task as crud_task
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[TaskOut])
def read_tasks(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user = Depends(deps.get_current_active_user)
) -> Any:
    # Admins can see all tasks, users only see theirs
    if current_user.role == "admin":
        tasks = crud_task.get_tasks(db, skip=skip, limit=limit)
    else:
        tasks = crud_task.get_tasks_by_owner(db, owner_id=current_user.id, skip=skip, limit=limit)
    return tasks

@router.post("/", response_model=TaskOut)
def create_task(
    *,
    db: Session = Depends(get_db),
    task_in: TaskCreate,
    current_user = Depends(deps.get_current_active_user)
) -> Any:
    task = crud_task.create_task(db=db, task=task_in, owner_id=current_user.id)
    return task

@router.put("/{id}", response_model=TaskOut)
def update_task(
    *,
    db: Session = Depends(get_db),
    id: int,
    task_in: TaskUpdate,
    current_user = Depends(deps.get_current_active_user)
) -> Any:
    task = crud_task.get_task(db=db, task_id=id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if current_user.role != "admin" and task.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    task = crud_task.update_task(db=db, task_id=id, task=task_in)
    return task

@router.delete("/{id}", response_model=TaskOut)
def delete_task(
    *,
    db: Session = Depends(get_db),
    id: int,
    current_user = Depends(deps.get_current_active_user)
) -> Any:
    task = crud_task.get_task(db=db, task_id=id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if current_user.role != "admin" and task.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    task = crud_task.delete_task(db=db, task_id=id)
    return task
