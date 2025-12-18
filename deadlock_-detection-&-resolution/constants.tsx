
import { Slide, GroupMember } from './types';

export const MEMBERS: GroupMember[] = [
  { name: 'Alcantara, Shaina Jana S.' },
  { name: 'Imperial, Chynna Mae L.' },
  { name: 'Ocfemia, Karl David Z.' },
  { name: 'Portugal, Aloysious Irish O.' }
];

export const SLIDES: Slide[] = [
  {
    id: 'cover',
    type: 'title',
    title: 'OS Deadlock - Detection and Resolution',
    subtitle: 'CS 114 - Operating Systems | BSCS 3A',
    headerIcon: 'terminal'
  },
  {
    id: 'intro',
    type: 'content',
    title: 'What is a Deadlock?',
    headerIcon: 'alert',
    content: [
      'Deadlock occurs in a multi-processing system when a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.',
      'It’s the digital equivalent of a "Traffic Jam" where no car can move because every car is blocking another.'
    ]
  },
  {
    id: 'coffman',
    type: 'interactive',
    title: 'The Four Coffman Conditions',
    subtitle: 'The ingredients for a system freeze. All 4 must coexist.',
    headerIcon: 'key',
    points: [
      { 
        label: 'Mutual Exclusion', 
        description: 'At least one resource must be held in a non-shareable mode. Only one process at a time can use the resource. If another process requests that resource, the requesting process must be delayed until the resource has been released by the current owner.',
        icon: 'lock'
      },
      { 
        label: 'Hold and Wait', 
        description: 'A process must be holding at least one resource and waiting to acquire additional resources that are currently being held by other processes. The process maintains its current resource holdings while demanding others, refusing to progress without all required tools.',
        icon: 'hand'
      },
      { 
        label: 'No Preemption', 
        description: 'Resources cannot be forcibly taken from a process. A resource can be released only voluntarily by the process holding it, after that process has completed its task. The operating system cannot intervene to snatch the resource away to satisfy another process.',
        icon: 'shield'
      },
      { 
        label: 'Circular Wait', 
        description: 'A set of processes {P0, P1, ..., Pn} exists such that P0 is waiting for a resource held by P1, P1 is waiting for a resource held by P2, and so on, with Pn waiting for a resource held by P0. This creates a closed dependency loop where no one can move first.',
        icon: 'refresh'
      }
    ]
  },
  {
    id: 'scenario',
    type: 'split',
    title: 'The Kitchen Scenario',
    subtitle: 'A Relatable Analogy',
    headerIcon: 'chef',
    content: [
      'Chefs (Processes) need a combination of Tools (Resources) to finish a dish.',
      'Chef 1: Needs Knife & Bread',
      'Chef 2: Needs Bread & Plate',
      'Chef 3: Needs Plate & Knife',
      'Watch how the system enters a frozen state...'
    ],
    visualId: 'scenario-status'
  },
  {
    id: 'rag-step-1',
    type: 'split',
    title: 'Step 1: Partial Acquisition',
    subtitle: 'P1 claims the Knife',
    headerIcon: 'knife',
    content: [
      'Chef P1 successfully acquires the Knife (Resource K).',
      'P1 now requests the Bread (Resource B), which is currently free.',
      'Wait... Chef P2 is faster!'
    ],
    visualId: 'rag-graph',
    visualStep: 1
  },
  {
    id: 'rag-step-2',
    type: 'split',
    title: 'Step 2: The Competition',
    subtitle: 'P2 claims the Bread',
    headerIcon: 'bread',
    content: [
      'Chef P2 acquires the Bread (B).',
      'P1 is now stuck waiting for B.',
      'P2 requests the Plate (P), but Chef P3 is already there.'
    ],
    visualId: 'rag-graph',
    visualStep: 2
  },
  {
    id: 'rag-step-3',
    type: 'split',
    title: 'Step 3: The Deadlock Closes',
    subtitle: 'P3 claims the Plate',
    headerIcon: 'plate',
    content: [
      'Chef P3 acquires the Plate (P).',
      'P2 is now stuck waiting for P.',
      'P3 requests the Knife (K)... but P1 is holding it!',
      'THE CIRCLE IS COMPLETE.'
    ],
    visualId: 'rag-graph',
    visualStep: 3
  },
  {
    id: 'prevention',
    type: 'split',
    title: 'Strategy 1: Prevention',
    subtitle: 'Breaking the "Circular Wait" Condition',
    headerIcon: 'prevent',
    content: [
      'Assign a hierarchy to resources (Knife=1, Bread=2, Plate=3).',
      'Rule: A process can only request resources in increasing order.',
      'If P3 holds the Plate(3), it is forbidden from asking for the Knife(1).',
      'This prevents any cycle from ever being physically possible.'
    ],
    visualId: 'solution-prevention'
  },
  {
    id: 'avoidance',
    type: 'split',
    title: 'Strategy 2: Avoidance',
    subtitle: "The Banker's Algorithm",
    headerIcon: 'bank',
    content: [
      'The OS acts as a "Banker" checking future safety.',
      'Before granting a resource, the system simulates all possible outcomes.',
      'If giving a tool leads to a state where at least one process might never finish, the request is BLOCKED.',
      'Result: The system stays in a "Safe State" by staying pessimistic.'
    ],
    visualId: 'solution-avoidance'
  },
  {
    id: 'recovery',
    type: 'split',
    title: 'Strategy 3: Detection & Recovery',
    subtitle: 'Breaking the Jam by Force',
    headerIcon: 'search',
    content: [
      'System periodically scans for cycles in the resource graph.',
      'Once detected, it selects a "Victim" process to terminate.',
      'Aborting one process (P2) releases its resources back to the pool.',
      'Others (P1) can then complete their execution, clearing the deadlock.'
    ],
    visualId: 'solution-recovery'
  },
  {
    id: 'conclusion',
    type: 'conclusion',
    title: 'Final Summary',
    headerIcon: 'book',
    content: [
      'Deadlocks are complex but predictable through Graph Theory (RAG cycles).',
      'Prevention is often too restrictive; Detection is often too expensive.',
      'Most modern OS (like Windows/Linux) prioritize performance and use manual intervention for rare deadlocks.'
    ]
  }
];

