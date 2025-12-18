
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
    subtitle: 'The fundamental requirements for deadlock. All four must occur simultaneously.',
    headerIcon: 'key',
    points: [
      { 
        label: 'Mutual Exclusion', 
        description: 'At least one resource must be held in a non-shareable mode. In this state, only one process at a time can utilize the resource. If another process requests that resource, the requesting process must be delayed until the resource has been released. This condition is fundamental because it creates the initial bottleneck; if resources were infinitely shareable, processes would never need to wait for one another.',
        icon: 'lock'
      },
      { 
        label: 'Hold and Wait', 
        description: 'A process must be currently holding at least one resource while simultaneously waiting to acquire additional resources that are being held by other processes. Instead of releasing its current holdings to allow other processes to proceed, the process "clings" to what it has, creating a partial block in the system. This incremental acquisition of resources is what allows a deadlock chain to begin forming.',
        icon: 'hand'
      },
      { 
        label: 'No Preemption', 
        description: 'Resources cannot be forcibly taken away from the processes holding them; they must be released voluntarily by the process after it has completed its task. The operating system lacks the authority to "snatch" a resource from a process to resolve a conflict. Without preemption, the system has no way to forcefully resolve a stalemate, meaning the deadlock persists until manual intervention or process termination occurs.',
        icon: 'shield'
      },
      { 
        label: 'Circular Wait', 
        description: 'A closed chain of dependency exists such that Process P0 is waiting for a resource held by P1, P1 is waiting for P2, and eventually, the last process in the chain is waiting for a resource held by P0. This circular dependency is the "final lock" that freezes the system. In a Resource Allocation Graph (RAG), this is visually represented as a cycle where no process is at the "head" of the line, and thus no progress can ever be made.',
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
      'Chef P1 is now "holding" one tool and "waiting" for another.'
    ],
    visualId: 'rag-graph',
    visualStep: 1
  },
  {
    id: 'rag-step-2',
    type: 'split',
    title: 'Step 2: Growing Dependency',
    subtitle: 'P2 claims the Bread',
    headerIcon: 'bread',
    content: [
      'Chef P2 arrives and acquires the Bread (Resource B).',
      'P1 is now officially "blocked" as B is held by P2.',
      'P2 then requests the Plate (Resource P) to finish their task.'
    ],
    visualId: 'rag-graph',
    visualStep: 2
  },
  {
    id: 'rag-step-3',
    type: 'split',
    title: 'Step 3: The Deadlock Cycle',
    subtitle: 'P3 claims the Plate',
    headerIcon: 'plate',
    content: [
      'Chef P3 acquires the Plate (Resource P).',
      'P2 is now blocked waiting for P3.',
      'Finally, P3 requests the Knife held by P1.',
      'The cycle is closed. No one can move!'
    ],
    visualId: 'rag-graph',
    visualStep: 3
  },
  {
    id: 'interactive-simulation',
    type: 'simulation',
    title: 'Interactive RAG Simulation',
    subtitle: 'Play with the system',
    headerIcon: 'logic',
    content: [
      'Experiment with the Resource Allocation Graph directly.',
      'Toggle between strategies to see how they prevent or break the circular chain.'
    ],
    visualId: 'interactive-rag'
  },
  {
    id: 'prevention',
    type: 'split',
    title: 'Strategy 1: Prevention',
    subtitle: 'Breaking the "Circular Wait" Condition',
    headerIcon: 'prevent',
    content: [
      'Hierarchy: Knife=1, Bread=2, Plate=3.',
      'Rule: A process can only request resources in strictly increasing rank.',
      'By forcing Chef P3 to ask for the Knife(1) before the Plate(3), we prevent a cycle.',
      'The graph remains a "Tree" instead of a "Circle".'
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
      'Before granting any tool, the system simulates if everyone can still finish.',
      'If giving a tool leads to an "Unsafe State", the request is delayed.',
      'Outcome: The system proactively avoids ever reaching a point of deadlock.'
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
      'The OS lets deadlocks happen, then fixes them.',
      'It periodically scans the Wait-For Graph for cycles.',
      'Once a cycle is found, it terminates a "Victim" process (like Chef P2).',
      'This releases tools so others can finish their meals.'
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

