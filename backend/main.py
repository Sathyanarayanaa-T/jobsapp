from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import bcrypt
import database

app = FastAPI()

# Allow requests from any origin (needed for React Native / Web)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get a database session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models for request bodies
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# Helper functions for passwords
def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


@app.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(database.User).filter(database.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password and save new user
    hashed_password = get_password_hash(user.password)
    new_user = database.User(name=user.name, email=user.email, hashed_password=hashed_password)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "User registered successfully", "user": {"name": new_user.name, "email": new_user.email}}


@app.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    # Find user by email
    db_user = db.query(database.User).filter(database.User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Verify password
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    return {"message": "Login successful", "user": {"name": db_user.name, "email": db_user.email}}

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Hexaware API is running"}
