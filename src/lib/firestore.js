import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Mock data storage for development
let mockData = {
  users: {},
  content: {},
  worksheets: {},
  visualAids: {},
  assessments: {},
  videos: {}
};

// Generate mock ID
const generateMockId = () => `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Content Operations
export const saveGeneratedContent = async (userId, contentData) => {
  try {
    const contentId = generateMockId();
    const content = {
      id: contentId,
      userId,
      ...contentData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Mock storage
    mockData.content[contentId] = content;

    // In production, use Firestore:
    // const docRef = await addDoc(collection(db, 'content'), {
    //   userId,
    //   ...contentData,
    //   createdAt: serverTimestamp(),
    //   updatedAt: serverTimestamp()
    // });
    // return docRef.id;

    return contentId;
  } catch (error) {
    console.error('Error saving content:', error);
    throw error;
  }
};

export const getUserContent = async (userId, contentType = null) => {
  try {
    // Mock data retrieval
    const userContent = Object.values(mockData.content)
      .filter(content => content.userId === userId)
      .filter(content => !contentType || content.contentType === contentType)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // In production, use Firestore:
    // let q = query(
    //   collection(db, 'content'),
    //   where('userId', '==', userId),
    //   orderBy('createdAt', 'desc')
    // );
    
    // if (contentType) {
    //   q = query(q, where('contentType', '==', contentType));
    // }
    
    // const querySnapshot = await getDocs(q);
    // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return userContent;
  } catch (error) {
    console.error('Error getting user content:', error);
    throw error;
  }
};

// Worksheet Operations
export const saveWorksheet = async (userId, worksheetData) => {
  try {
    const worksheetId = generateMockId();
    const worksheet = {
      id: worksheetId,
      userId,
      ...worksheetData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockData.worksheets[worksheetId] = worksheet;
    return worksheetId;
  } catch (error) {
    console.error('Error saving worksheet:', error);
    throw error;
  }
};

export const getUserWorksheets = async (userId) => {
  try {
    const userWorksheets = Object.values(mockData.worksheets)
      .filter(worksheet => worksheet.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return userWorksheets;
  } catch (error) {
    console.error('Error getting user worksheets:', error);
    throw error;
  }
};

// Visual Aid Operations
export const saveVisualAid = async (userId, visualAidData) => {
  try {
    const visualAidId = generateMockId();
    const visualAid = {
      id: visualAidId,
      userId,
      ...visualAidData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockData.visualAids[visualAidId] = visualAid;
    return visualAidId;
  } catch (error) {
    console.error('Error saving visual aid:', error);
    throw error;
  }
};

export const getUserVisualAids = async (userId) => {
  try {
    const userVisualAids = Object.values(mockData.visualAids)
      .filter(aid => aid.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return userVisualAids;
  } catch (error) {
    console.error('Error getting user visual aids:', error);
    throw error;
  }
};

// Assessment Operations
export const saveAssessment = async (userId, assessmentData) => {
  try {
    const assessmentId = generateMockId();
    const assessment = {
      id: assessmentId,
      userId,
      ...assessmentData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockData.assessments[assessmentId] = assessment;
    return assessmentId;
  } catch (error) {
    console.error('Error saving assessment:', error);
    throw error;
  }
};

export const getUserAssessments = async (userId) => {
  try {
    const userAssessments = Object.values(mockData.assessments)
      .filter(assessment => assessment.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return userAssessments;
  } catch (error) {
    console.error('Error getting user assessments:', error);
    throw error;
  }
};

// Video Operations
export const saveVideoContent = async (userId, videoData) => {
  try {
    const videoId = generateMockId();
    const video = {
      id: videoId,
      userId,
      ...videoData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockData.videos[videoId] = video;
    return videoId;
  } catch (error) {
    console.error('Error saving video:', error);
    throw error;
  }
};

export const getUserVideos = async (userId) => {
  try {
    const userVideos = Object.values(mockData.videos)
      .filter(video => video.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return userVideos;
  } catch (error) {
    console.error('Error getting user videos:', error);
    throw error;
  }
};

// Generic Operations
export const updateDocument = async (collection, docId, updates) => {
  try {
    // Mock update
    if (mockData[collection] && mockData[collection][docId]) {
      mockData[collection][docId] = {
        ...mockData[collection][docId],
        ...updates,
        updatedAt: new Date().toISOString()
      };
    }

    // In production:
    // await updateDoc(doc(db, collection, docId), {
    //   ...updates,
    //   updatedAt: serverTimestamp()
    // });
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteDocument = async (collection, docId) => {
  try {
    // Mock delete
    if (mockData[collection] && mockData[collection][docId]) {
      delete mockData[collection][docId];
    }

    // In production:
    // await deleteDoc(doc(db, collection, docId));
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

// Get user statistics
export const getUserStats = async (userId) => {
  try {
    const stats = {
      totalContent: Object.values(mockData.content).filter(c => c.userId === userId).length,
      totalWorksheets: Object.values(mockData.worksheets).filter(w => w.userId === userId).length,
      totalVisualAids: Object.values(mockData.visualAids).filter(v => v.userId === userId).length,
      totalAssessments: Object.values(mockData.assessments).filter(a => a.userId === userId).length,
      totalVideos: Object.values(mockData.videos).filter(v => v.userId === userId).length
    };

    return stats;
  } catch (error) {
    console.error('Error getting user stats:', error);
    throw error;
  }
};

