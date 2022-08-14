import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Float "mo:base/Float";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import HashMap "mo:base/HashMap";
import TrieSet "mo:base/TrieSet";
import List "mo:base/List";
import Time "mo:base/Time";

shared({caller = owner}) actor class EduBlock() {
  private type UserIdentity = Principal;
  private type Set<X> = TrieSet.Set<X>;
  private type HashMap<K, V> = HashMap.HashMap<K, V>;

  private type StudentSubject = {
    name : Text;
    firstHalfScore : Float;
    secondHalfScore : Float;
    finalScore : Float;
    resitScore : Float;
    teacherName : Text;
  };

  private type StudentGrade = {
    name : Text;
    subjects : [StudentSubject];
    homeTeacher : UserIdentity;
  };

  private type Student = {
    grades : [StudentGrade];
  };

  private type Response = {
    errorCode: Int;
    errorMessage: Text;
  };

  private type ResponseWithData<T> = {
    errorCode: Int;
    errorMessage: Text;
    data: ?T;
  };

  /**
   * The set of teachers' principals
   */
  private stable var teachers : Set<UserIdentity> = TrieSet.empty();

  /**
   * The map of students' principals to their records
   */
  private stable var studentEntries : [(UserIdentity, Student)] = [];
  private let students : HashMap<UserIdentity, Student> = HashMap.fromIter(studentEntries.vals(), 10, Principal.equal, Principal.hash);

  system func preupgrade() {
    studentEntries := Iter.toArray(students.entries());
  };

  system func postupgrade() {
    studentEntries := [];
  };

  public func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  public func greetOwner() : async Text {
    return "Hello, " # Principal.toText(owner) # "!";
  };

  private func _optional<T>(value : T) : ?T {
    return do ? { value };
  };

  private func _isOwner(principal : Principal) : Bool {
    return Principal.equal(principal, owner);
  };

  private func _isTeacher(caller : UserIdentity) : Bool {
    let teacherArray : [UserIdentity] = TrieSet.toArray(teachers);
    for (currentTeacher in teacherArray.vals()) {
      if (Principal.equal(caller, currentTeacher)) {
        return true;
      };
    };
    return false;
  };

  private func _canGetStudent(caller : UserIdentity, student : UserIdentity) : Bool {
    if (Principal.equal(caller, student)) {
      return true;
    };
    if (_isTeacher(caller)) {
      return true;
    };
    return false;
  };

  private func _getStudent(student : UserIdentity) : ?Student {
    return students.get(student);
  };

  private func _containsStudent(student : UserIdentity) : Bool {
    switch (_getStudent(student)) {
      case (null) return false;
      case (_) return true;
    };
  };

  private func _replaceStudent(student : UserIdentity, newStudent : Student) : () {
    students.put(student, newStudent);
  };

  private func _addStudent(student : UserIdentity) : Bool {
    if (not _containsStudent(student)) {
      _replaceStudent(student, {
        grades = []
      });
      return true;
    };
    return false;
  };

  private func _getStudentGrades(student : UserIdentity) : ?[StudentGrade] {
    switch (_getStudent(student)) {
      case (null) return null;
      case (?student) return _optional(student.grades);
    };
  };

  private func _getStudentGrade(student : Student, gradeName : Text) : ?StudentGrade {
    for (currentGrade in student.grades.vals()) {
      if (currentGrade.name == gradeName) {
        return _optional(currentGrade);
      };
    };
    return null;
  };

  private func _containsStudentGrade(student : Student, gradeName : Text) : Bool {
    switch (_getStudentGrade(student, gradeName)) {
      case (null) return false;
      case (_) return true;
    };
  };

  private func _addStudentGradeIfNotFound(student : Student, gradeName : Text, homeTeacher : UserIdentity) : Student {
    if (not _containsStudentGrade(student, gradeName)) {
      let newGrades : [StudentGrade] = Array.append(student.grades, [{name = gradeName; subjects = []; homeTeacher = homeTeacher}]);
      return {grades = newGrades};
    };
    return student;
  };

  private func _updateStudentGrade(student : Student, gradeName : Text, grade : StudentGrade) : Student {
    let newGrades : [StudentGrade] = Array.map(student.grades, func(currentGrade : StudentGrade) : StudentGrade {
      if (currentGrade.name == gradeName) {
        return grade;
      };
      return currentGrade;
    });
    return {grades = newGrades};
  };

  private func _getStudentSubjects(student : Student, gradeName : Text) : ?[StudentSubject] {
    switch (_getStudentGrade(student, gradeName)) {
      case (null) return null;
      case (?grade) return _optional(grade.subjects);
    };
  };

  private func _updateStudentSubjects(student : Student, gradeName : Text, subjects : [StudentSubject]) : Student {
    switch (_getStudentGrade(student, gradeName)) {
      case (null) return student;
      case (?grade) {
        let newGrade : StudentGrade = {name = gradeName; subjects = subjects; homeTeacher = grade.homeTeacher};
        return _updateStudentGrade(student, gradeName, newGrade);
      };
    };
  };

  /**
   * Add new teachers to the allowed set
   */
  public shared({caller}) func addTeachers(newTeachers : [UserIdentity]) : async Response {
    if (not _isOwner(caller)) {
      return {errorCode = 1; errorMessage = "You are not the owner of this block"};
    };
    let newTeacherSet : Set<UserIdentity> = TrieSet.fromArray(newTeachers, Principal.hash, Principal.equal);
    teachers := TrieSet.union(teachers, newTeacherSet, Principal.equal);
    return {errorCode = 0; errorMessage = "Added teachers"};
  };

  /**
   * Add a new student to the system
   */
  public shared({caller}) func addStudent(student : UserIdentity) : async Response {
    if (not _isTeacher(caller)) {
      return {errorCode = 1; errorMessage = "You are not a teacher"};
    };

    if (not _addStudent(student)) {
      return {errorCode = 2; errorMessage = "Student already exists"};
    };

    return {errorCode = 0; errorMessage = "Student added"};
  };

  /**
   * Get the student by its identity
   */
  public shared({caller}) func getStudent(student : UserIdentity) : async ResponseWithData<Student> {
    if (not _canGetStudent(caller, student)) {
      return {errorCode = 1; errorMessage = "You can not get the student"; data = null};
    };

    switch (_getStudent(student)) {
      case (null) return {errorCode = 2; errorMessage = "Student does not exist"; data = null};
      case (v) return {errorCode = 0; errorMessage = "Student found"; data = v};
    };
  };

  /**
   * Get the student's grades
   */
  public shared({caller}) func getStudentGrades(student : UserIdentity) : async ResponseWithData<[StudentGrade]> {
    if (not _canGetStudent(caller, student)) {
      return {errorCode = 1; errorMessage = "You can not get the student"; data = null};
    };

    switch (_getStudentGrades(student)) {
      case (null) return {errorCode = 2; errorMessage = "Student does not exist"; data = null};
      case (v) return {errorCode = 0; errorMessage = "Student grades found"; data = v};
    };
  };

  /**
   * Get the student's grade by name
   */
  public shared({caller}) func getStudentGrade(student : UserIdentity, gradeName : Text) : async ResponseWithData<StudentGrade> {
    if (not _canGetStudent(caller, student)) {
      return {errorCode = 1; errorMessage = "You can not get the student"; data = null};
    };

    switch (_getStudent(student)) {
      case (null) return {errorCode = 2; errorMessage = "Student does not exist"; data = null};
      case (?student) {
        switch (_getStudentGrade(student, gradeName)) {
          case (null) return {errorCode = 3; errorMessage = "Grade does not exist"; data = null};
          case (v) return {errorCode = 0; errorMessage = "Grade found"; data = v};
        };
      };
    };
  };

  /**
   * Get the student's subjects by grade name
   */
  public shared({caller}) func getStudentSubjects(student : UserIdentity, gradeName : Text) : async ResponseWithData<[StudentSubject]> {
    if (not _canGetStudent(caller, student)) {
      return {errorCode = 1; errorMessage = "You can not get the student"; data = null};
    };

    switch (_getStudent(student)) {
      case (null) return {errorCode = 2; errorMessage = "Student does not exist"; data = null};
      case (?student) {
        switch (_getStudentSubjects(student, gradeName)) {
          case (null) return {errorCode = 3; errorMessage = "Grade does not exist"; data = null};
          case (v) return {errorCode = 0; errorMessage = "Subjects found"; data = v};
        };
      };
    };
  };

  /**
   * Update the student's subjects by grade name
   */
  public shared({caller}) func updateStudentSubjects(studentIdentity : UserIdentity, gradeName : Text, subjects : [StudentSubject]) : async Response {
    switch (_getStudent(studentIdentity)) {
      case (null) return {errorCode = 1; errorMessage = "Student does not exist"};
      case (?student) {
        let checkedStudent : Student = _addStudentGradeIfNotFound(student, gradeName, caller);
        switch (_getStudentGrade(checkedStudent, gradeName)) {
          case (null) return {errorCode = 2; errorMessage = "Grade does not exist"};
          case (?studentGrade) {
            if (not (Principal.equal(caller, studentGrade.homeTeacher))) {
              return {errorCode = 3; errorMessage = "Only the home teacher can update the subjects"};
            };
            let newStudent : Student = _updateStudentSubjects(checkedStudent, gradeName, subjects);
            _replaceStudent(studentIdentity, newStudent);
            return {errorCode = 0; errorMessage = "Subjects updated"};
          };
        };
      };
    };
  };
};
