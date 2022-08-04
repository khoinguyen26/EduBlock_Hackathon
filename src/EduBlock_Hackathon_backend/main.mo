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

actor {
  private type UserIdentity = Principal;
  private type Set<X> = TrieSet.Set<X>;
  private type HashMap<K, V> = HashMap.HashMap<K, V>;
  private type Time = Time.Time;

  private type StudentRecordEntry = {
    name : Text;
    entryType : Text;
    score : Float;
  };

  private type StudentSubject = {
    name : Text;
    recordEntries : [var StudentRecordEntry];
    teacher : UserIdentity;
  };

  private type StudentGrade = {
    name : Text;
    subjects : [var StudentSubject];
    teacher : UserIdentity;
  };

  private type StudentInformation = {
    name : Text;
    birthday : Time;
    schoolName : Text;
    address : Text;
  };

  private type Student = {
    grades : [var StudentGrade];
  };

  /**
   * The owner's principal
   */
  private let ownerPrincipal : UserIdentity = Principal.fromText("6v3jr-m7diz-omgv3-bul5q-h7x5m-5lvr5-gnlb4-nm6ek-dyhfu-2w55j-bqe");

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
};
